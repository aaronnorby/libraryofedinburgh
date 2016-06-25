package libserver

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"libraryofedinburgh/bookmaker"
)

const (
	port string = ":8000"
)

func Serve() {
	// serve static files from 'static/' dir
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/book", bookHandler)

	log.Println("Listening on port " + port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	// indexHandler checks to see if the path is the root path. If not, it serves a
	// custom 404 page (or 500 error if opening the page fails). Otherwise, serves
	// the index page.
	if r.URL.Path != "/" {
		fourofour, err := os.Open("static/404.html")
		defer fourofour.Close()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		// note that we're not setting many headers here
		w.Header().Set("Content-Type", "text/html; charset=UTF-8")
		w.WriteHeader(http.StatusNotFound)
		io.Copy(w, fourofour)
	} else {
		http.ServeFile(w, r, "static/index.html")
	}
}

func bookHandler(w http.ResponseWriter, r *http.Request) {
	// Route for requests for books
	bookFile := "texts/treatise.txt"

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

	// TODO: cache most recent books
	book, err := bookmaker.MakeBook(bookFile, seed)

	if err != nil {
		log.Fatal(err)
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
