package main

import "libraryofedinburgh/libserver"

func main() {
	opts := libserver.Opts{StaticDir: "webapp"}
	libserver.Serve(opts)
}
