package getTexts

import (
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
    return nil, err
  }
  defer resp.Body.Close()
  body, err := ioutil.ReadAll(resp.Body)
  if err != nil {
    return nil, err
  }
  return body, nil
}

func SaveTextToDisk(text []byte, fileName string) error {
  err := ioutil.WriteFile(fileName, text, 0777); if err != nil {
    return err
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
