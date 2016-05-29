// Package getTexts provides methods for fetching and saving a copy of Hume's
// Treatise from Project Gutenberg
package getTexts

import (
  "fmt"
  "io/ioutil"
  "net/http"
)

// url for testing
const (
  treatiseUrl string = "http://www.gutenberg.org/cache/epub/4705/pg4705.txt"
)

func GetText(url string) ([]byte, error) {
  resp, err := http.Get(url)
  if err != nil {
    return nil, fmt.Errorf("error in GetText calling %s: %v", url, err)
  }
  defer resp.Body.Close()
  body, err := ioutil.ReadAll(resp.Body)
  if err != nil {
    return nil, fmt.Errorf("error in GetText reading response body: %v", err)
  }
  return body, nil
}

func SaveTextToDisk(text []byte, fileName string) error {
 if err := ioutil.WriteFile(fileName, text, 0777); err != nil {
    return fmt.Errorf("error writing text to disk: %v", err)
  }
  return nil
}

func GetAndSave() error {
  text, err := GetText(treatiseUrl)
  if err != nil {
    return err
  }
  writeErr := SaveTextToDisk(text, "treatise.txt")
  if writeErr != nil {
    return writeErr
  }
  return nil
}
