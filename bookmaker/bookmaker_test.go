package bookmaker

import (
  "testing"
)

func TestCountNewlines(t *testing.T) {
  words := "the\ncat and the\n hat"
  numNewlines := countNewlines([]byte(words))
  expected := 2
  if numNewlines != expected {
    t.Errorf("countNewlines(%v) == %v, expected %v", words, numNewlines, expected)
  }
}

func TestShuffle(t *testing.T) {
  // Does not test uniformity of permutations. Only tests that shuffles in a row
  // are distinct
  words := []string{"one", "two", "three", "four", "five", "six"}
  n := len(words)
  result1 := shuffle(words)
  result2 := shuffle(words)
  if result1 == nil || result2 == nil {
    t.Errorf("%v or %v is nil", result1, result2)
  }
  if len(result1) != n || len(result2) != n {
    t.Errorf("%v not same length as %v", result1, result2)
  }
  same := true
  for i := 0; i < len(result1); i++ {
    if result1[i] != result2[i] {
      same = false
      break
    }
  }
  if same {
    t.Errorf("%v and %v are the same", result1, result2)
  }
}

func TestMakeBook(t *testing.T) {
  filename := "testdata/exampletext.txt"
  textPerm, err := makeBook(filename)
  if err != nil {
    t.Errorf("Error in makeBook(%q): %v", filename, err)
  }
  // for go test -v show the permutation
  t.Log(string(textPerm))
}
