FROM golang:1.6

WORKDIR /go/src/libraryofedinburgh

ADD application.go /go/src/libraryofedinburgh

ADD ./bookmaker bookmaker/

ADD ./libserver libserver/

ADD ./texts texts/

ADD webapp/dist webapp/dist/

EXPOSE 5000
