# Library of Edinburgh

A pointless project combining Jorge Luis Borges' *Library of Babel* with David
Hume's *Treatise of Human Nature*. Because it's Hume, the volumes will be generated
probabilistically. A server written in Go does the text processing and serves as
the api (and, temporarily, static file server) for a front end React/Redux app. The
server allows you to re-find a previously created book by sending the seed that was
used to create it. It also uses a LRU cache to store the most recently
created books.

You use it at
[http://www.libraryofedinburgh.com/](http://www.libraryofedinburgh.com/).

## Running locally

### In Docker:

First, build the image from the included Dockerfile:

```
docker build -t library .
```

Then, run the image (with an interactive shell):

```
docker run -ti --rm -p 3000:3000 -v /path/to/go/src:/go/src library
```

Then:

```
cd webapp && npm install
```

Yes, I know, this is some in-between thing with half in Docker and half out. But
that's laziness for you.

Then:

```
make build
```

Then head to `localhost:3000`.

### Not in Docker:

First:

```
go run application.go
```
to start the go server.

Then:

```
cd webapp && make run
```

This will start webpack-dev-server, which is useful for working on the frontend
part of this. The app will be available at `localhost:8080` with the go server
at port 3000.
