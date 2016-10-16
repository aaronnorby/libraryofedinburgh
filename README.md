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
