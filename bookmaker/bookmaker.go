// Package bookmaker generates permutations of a given text
package bookmaker

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "os"
  "strings"
)

func makeBook(fileName string) ([]byte, error) {
  // makeBook takes a text file and generates a permutation of the words in that
  // text. Note that each continuous whitespace counts as a word.
  file, err := os.Open(fileName)
  defer file.Close()
  if err != nil {
    return nil, fmt.Errorf("error opening file %q: %v", fileName, err)
  }

  // note: text is a []byte, as strings are just byte slices
  text, err := ioutil.ReadAll(file)
  if err != nil {
    return nil, fmt.Errorf("error reading file %q: %v", fileName, err)
  }

  // now we want a string slice of all the words, including whitespace 'words'
  // first, we split by spaces
  // this isn't right because it's going to leave whitespace behind
  wordsAndSpaces := strings.Split(string(text), " ")

  // next, we loop through to make words
  // to create whitespace words we use bytes.Buffer.WriteString method
  //  var word bytes.Buffer
  //  for whitespaceword {
  //    word.WriteString(whitespaceword)
  //  }
  //  whitespace := buffer.String()

  return nil, nil
}
