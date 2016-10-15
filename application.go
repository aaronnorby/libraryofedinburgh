package main

import "libraryofedinburgh/libserver"

// func main() {
// 	opts := libserver.Opts{StaticDir: "webapp/dist", FileServe: true}
// 	libserver.Serve(opts)
// }

func main() {
	opts := libserver.Opts{FileServe: false}
	libserver.Serve(opts)
}
