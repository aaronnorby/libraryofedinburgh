package libserver

import (
	"sync"
	"testing"
)

func TestCache(t *testing.T) {
	cache := NewCache(3)
	if cache.Cap != 3 {
		t.Errorf("cache cap should be 3, was %s", cache.Cap)
	}

	cache.Add(1, "hello")
	cache.Add(2, "hello again")
	cache.Add(3, "goodbye")

	len := cache.Len()
	if len != 3 {
		t.Errorf("cache len should be 3, was %s", len)
	}

	goodbye := cache.Get(3)
	// t.Log(cache.hash[3].Value)
	if goodbye != "goodbye" {
		t.Errorf("element value should be \"goodbye\", was %q", goodbye)
	}

	front := cache.list.Front()
	if front.Value.(*item).value != "goodbye" {
		t.Error("most recently accessed element should be at front of list, instead got %q", front.Value)
	}

	currBack := cache.list.Back()
	cache.Add(4, "and another")
	newBack := cache.list.Back()

	// after adding 4th item, cache should eject oldest and still be 3 long
	if cache.Len() != 3 {
		t.Errorf("Cache should be len 3, is %v", cache.Len())
	}

	if currBack == newBack {
		// the wrong item was ejected
		t.Error("Cache did not eject the oldest item")
	}

}

func TestCacheServer(t *testing.T) {
	var wg sync.WaitGroup
	results := make(chan int64)
	cs := NewCacheServer(2)

	seeds := []int64{1, 2, 3, 2}
	for _, i := range seeds {
		wg.Add(1)
		go func(i int64) {
			defer wg.Done()
			book, err := cs.Get(i)
			if err != nil {
				t.Errorf("Error getting from cache with seed: %v", err)
			}
			results <- book.Seed
		}(i)
	}

	go func() {
		wg.Wait()
		close(results)
		cs.Close()
	}()
	for result := range results {
		t.Logf("returned seed: %v\n", result)
	}
	t.Log("done waiting")
}
