package main

import (
  "log"

  "library-of-edinburgh/getTexts"
)

func main() {
  err := getTexts.GetAndSave(); if err != nil {
    log.Fatal(err)
  }
}
