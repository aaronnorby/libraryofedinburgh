import React, { Component, PropTypes } from 'react';

export default function SiteHeader(props) {
  return (
    <div className="site-header">
      <h1 className="site-header__heading">
        Library of Edinburgh
      </h1>
      <section className="site-explainer">
        <p>
          This site is a meaningless combination of David Hume's <span
    className="title">Treatise Concerning Human Understanding</span> and Jorge Luis
    Borges' <span className="title">Library of Babel</span>. It generates
    permutations of Hume's book. If you leave the "seed" input blank, you'll get a
    random book. The position of a word in a given permutation is determined via a
    normal distribution with the mean being that word's position in the original
    text (paragraph breaks, while equal in number to the original, are distributed
      evenly). In addition to a book, you also get that book's "seed". This is the
    random seed that was used to generate the book (which is the time at which the
      book was created represented as the number of nanoseconds since Jan 1 1970
      UTC), and if you enter a seed into
    the input box and then ask for a book, you'll get that same book back.
        </p>
        <p>
          The code for this site and the API server that makes the books is
    available <a href="https://github.com/aaronnorby/libraryofedinburgh">here</a>.
        </p>
      </section>
    </div>
  );
}

