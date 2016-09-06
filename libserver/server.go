package libserver

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"libraryofedinburgh/bookmaker"
)

const (
	port          string = ":8000"
	cacheCapacity int    = 3
	bookFile      string = "texts/treatise.txt"
)

type Opts struct {
	StaticDir, FourOhFourPath string
}

var serverOpts Opts

// threadsafe cache access
var cs *CacheServer = NewCacheServer(cacheCapacity)

func Serve(opts Opts) {
	if opts.StaticDir != "" {
		wd, err := os.Getwd()
		if err != nil {
			log.Fatal(err)
		}
		serverOpts.StaticDir = filepath.Join(wd, opts.StaticDir)
	} else {
		// serve static files from 'static/' dir
		staticDir, err := getStaticDir()
		if err != nil {
			log.Printf("static dir error: %v", err)
		}
		serverOpts.StaticDir = staticDir
	}

	if opts.FourOhFourPath != "" {
		wd, err := os.Getwd()
		if err != nil {
			log.Fatal(err)
		}
		serverOpts.FourOhFourPath = filepath.Join(wd, opts.FourOhFourPath)
	}

	fs := http.FileServer(http.Dir(serverOpts.StaticDir))

	// any requests for static will get sent to the designated static dir
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.Handle("/", fs)

	// not using this handler, which is where the custom 404 logic is
	// http.HandleFunc("/", indexHandler)
	http.HandleFunc("/book", bookHandler)

	log.Println("Listening on port " + port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func getStaticDir() (string, error) {
	wd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	// if we're inside the libserver dir, don't include it
	if filepath.Base(wd) == "libserver" {
		return filepath.Join(wd, "static"), nil
	} else {
		return filepath.Join(wd, "libserver", "static"), nil
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	// indexHandler checks to see if the path is the root path. If not, it serves a
	// custom 404 page (or 500 error if opening the page fails). Otherwise, serves
	// the index page.
	staticDir := serverOpts.StaticDir
	log.Println(staticDir)
	var fourOhFour string
	if fourOhFour = serverOpts.FourOhFourPath; fourOhFour == "" {
		libserverStaticDir, _ := getStaticDir()
		fourOhFour = filepath.Join(libserverStaticDir, "404.html")
	}

	if r.URL.Path != "/" {
		fourofour, err := os.Open(fourOhFour)
		defer fourofour.Close()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		// note that we're not setting many headers here
		w.Header().Set("Content-Type", "text/html; charset=UTF-8")
		w.WriteHeader(http.StatusNotFound)
		io.Copy(w, fourofour)
	} else {
		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	}
}

func bookHandler(w http.ResponseWriter, r *http.Request) {
	// Route for requests for books

	// key is to be used as a seed to regenerate a book. We check to see if one has
	// been provided as a query parameter
	key := r.FormValue("key")

	var seed int64

	if key == "" {
		key = "0"
	}

	seed, err := strconv.ParseInt(key, 10, 64)
	if err != nil {
		// temporary error handling solution TODO
		log.Fatal(err)
	}

	var book *bookmaker.Book
	if seed == 0 {
		// make a new book
		book, err = bookmaker.MakeBook(bookFile, seed)
		if err != nil {
			log.Fatal(err)
		}
	} else {
		// try to get the book from cache. If it's not there, the cache server will
		// return a new book
		book, err = cs.Get(seed)
		if err != nil {
			log.Fatal(err)
		}
	}

	bookString := struct {
		Text string `json:"text"`
		Seed int64  `json:"seed"`
	}{
		string(book.Text),
		book.Seed,
	}
	bookJson, err := json.Marshal(bookString)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bookJson)

}
