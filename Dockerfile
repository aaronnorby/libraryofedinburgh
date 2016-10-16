FROM golang:1.6

WORKDIR /go/src/libraryofedinburgh

ADD application.go /go/src/libraryofedinburgh

ADD ./bookmaker bookmaker/

ADD ./libserver libserver/

ADD ./texts texts/

ADD webapp/dist webapp/dist/

RUN go build application.go

ENTRYPOINT /go/src/libraryofedinburgh/application

EXPOSE 3000
