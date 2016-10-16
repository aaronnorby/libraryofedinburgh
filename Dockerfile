FROM golang:1.6

WORKDIR /go/src/libraryofedinburgh

ADD application.go /go/src/libraryofedinburgh

ADD ./bookmaker bookmaker/

ADD ./libserver libserver/

ADD ./texts texts/

ADD webapp/dist webapp/dist/

CMD ["go", "run", "application.go"]

EXPOSE 3000
