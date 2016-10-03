import React, { Component, PropTypes } from 'react';

export default class BookDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.book.isFetching) return null;

    return (
      <div className="book-display">
        {this.renderSeed()}
        {this.renderBook()}
      </div>
    );
  }

  renderBook() {
    if (this.props.book.data.text === undefined) return null;
    if (this.props.book.error) return this.renderBookError();

    let text = this.props.book.data.text;

    return (
      <div className="book-display__book">
        {this.renderText(text)}
      </div>
    );
  }

  renderSeed() {
    if (this.props.book.data.text === undefined) return;
    return (
      <div className="book-display__seed">Seed: {this.props.book.data.seed}</div>
    );
  }

  renderBookError() {
    return;
  }

  renderText(text) {
    const paras = text.split('\n\n');

    return (
      <div>
        {paras.map((para, i) => {
          return <p key={i}>{para}</p>
        })}
      </div>
    );
  }

};

BookDisplay.propTypes = {
  book: PropTypes.object.isRequired
};
