package main

import "libraryofedinburgh/libserver"

func main() {
	opts := libserver.Opts{StaticDir: "webapp/dist"}
	libserver.Serve(opts)
}
