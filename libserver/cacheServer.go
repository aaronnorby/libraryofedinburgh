package libserver

import (
	"libraryofedinburgh/bookmaker"
)

// ServeCache functions as a monitor goroutine to broker concurrent interactions
// with a single lru cache. Its pattern is adapted from 'The Go Programming Language'.
func (cServer *CacheServer) ServeCache(cap int) {
	cache := NewCache(cap)
	for req := range cServer.requests {
		// TODO need a check that this type cast works, ie that the key is valid
		report := cache.Get(req.key).(*bookReport) // TODO: this must be protected because it mutates the cache
		if report == nil {
			report = &bookReport{ready: make(chan struct{})}
			cache.Add(req.key, report)
			report.book.Seed = req.key.(int64)
			go report.getBook()
		}
		go report.sendBook(&req)
	}
}

func NewCacheServer() *CacheServer {
	cs := CacheServer{make(chan request)}
	return &cs
}

func (cServer *CacheServer) Close() {
	close(cServer.requests)
}

type CacheServer struct {
	requests chan request
}

func (cServer *CacheServer) Get(key interface{}) (*bookmaker.Book, error) {
	resp := make(chan *bookReport)
	req := request{key: key, response: resp}
	cServer.requests <- req
	report := <-req.response
	if report.err != nil {
		return nil, report.err
	}
	return report.book, nil
}

type request struct {
	key      interface{}
	response chan *bookReport // should be more restrictive
}

type bookReport struct {
	book  *bookmaker.Book
	err   error
	ready chan struct{}
}

func (b *bookReport) getBook() {
	// TODO: don't hardcode filepath. Should be const defined in libserver
	newBook, err := bookmaker.MakeBook("texts/exampletext.txt", b.book.Seed)
	if err != nil {
		b.err = err
	}
	b.book = newBook
	close(b.ready)
}

func (b *bookReport) sendBook(req *request) {
	<-b.ready
	req.response <- b
}
