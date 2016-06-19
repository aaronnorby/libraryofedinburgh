package bookmaker

import (
	"testing"
)

func TestCountNewlines(t *testing.T) {
	words := "the\n\ncat and the\n hat"
	numNewlines := countNewlinesRun([]byte(words))
	expected := 1
	if numNewlines[2] != expected {
		t.Errorf("countNewlines(%v) == %v, expected %v", words, numNewlines[2], expected)
	}
}

func TestShuffle(t *testing.T) {
	// Does not test uniformity of permutations. Only tests that shuffles in a row
	// are distinct
	words := []string{"one", "two", "three", "four", "five", "six"}
	n := len(words)
	result1, _ := shuffle(words, 0)
	result2, _ := shuffle(words, 0)
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
	book1, err := MakeBook(filename, 0)
	if err != nil {
		t.Errorf("Error in makeBook(%q): %v", filename, err)
	}
	// for go test -v show the permutation
	t.Log("\n" + string(book1.Text))

	book2, err := MakeBook(filename, 0)
	if err != nil {
		t.Errorf("Error in makeBook(%q), second call: %v", filename, err)
	}

	if string(book1.Text) == string(book2.Text) {
		t.Errorf("Subsequent book permutations are the same. Should be different.")
	}
}

func TestMakeBookWithSeed(t *testing.T) {
	// test generating and reusing a random seed to reproduce a text
	filename := "testdata/exampletext.txt"
	book1, err := MakeBook(filename, 0)
	if err != nil {
		t.Errorf("Error in MakeBook(%q): %v", filename, err)
	}
	book2, err := MakeBook(filename, book1.Seed)
	if err != nil {
		t.Errorf("Error in MakeBook(%q): %v", filename, err)
	}

	if book1.Seed != book2.Seed {
		t.Errorf("Returned seed %q != %q, should be equal", book1.Seed, book2.Seed)
	}
	if string(book1.Text) != string(book2.Text) {
		t.Errorf("Texts built with same seed not equal, should be equal")
	}
}
