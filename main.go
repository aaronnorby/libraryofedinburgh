package main

import (
  "fmt"
  "log"

  "library-of-edinburgh/getTexts"
)

func main() {
  err := getTexts.GetAndSave(); if err != nil {
    log.Fatal(err)
  }
  fmt.Println("treatise.txt created.")
}
