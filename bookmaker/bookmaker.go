// Package bookmaker generates permutations of a given text
package bookmaker

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "math/rand"
  "os"
  "strings"
  "time"
)

func makeBook(fileName string) ([]byte, error) {
  // makeBook takes a text file and generates a permutation of the words in that
  // text. Note that each continuous whitespace counts as a word.
  // At this point, it simply returns a randomly shuffled version of the text
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

  // now we want a string slice of all the words, including newline 'words' (not
  // all newlines - only those that break up grafs, ie runs of more than one \n)
  // first, we count the number of newline characters, so we can add these back in
  // later
  newlinesCount := countNewlinesRun(text)

  words := strings.Fields(string(text))

  // add newline chars back to our string slice
  for runLength, count := range newlinesCount {
    var run bytes.Buffer
    for i := 0; i < runLength; i++ {
      run.WriteString("\n")
    }
    runString := run.String()
    for i := 0; i < count; i++ {
      words = append(words, runString)
    }
  }

  // at this point, words in a string slice of all the words and newlines in the
  // text.
  shuffledWords := shuffle(words)
  wordsAsByteSlice := []byte(strings.Join(shuffledWords, " "))

  return wordsAsByteSlice, nil
}

func countNewlinesRun(s []byte) map[int]int {
  // find paragraph and heading breaks by counting runs of >1 newline character
  runs := make(map[int]int)
  var run int
  for _, char := range s {
    if string(char) == "\n" {
      run++
    } else if run > 1 {
      runs[run]++
      run = 0
    } else {
      run = 0
    }
  }

  return runs
}

func shuffle(words []string) []string {
  // shuffle performs a shiffer-yates shuffle on words and returns a new shuffled
  // []string
  n := len(words)
  result := make([]string, n)
  rng := rand.New(rand.NewSource(time.Now().UnixNano()))
  for i := 0; i < n; i++ {
    j := rng.Intn(i+1)
    if j != i {
      result[i] = result[j]
    }
    result[j] = words[i]
  }
  return result
}
