import React, { Component, PropTypes } from 'react';

export default class BookDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.renderSeed()}
        {this.renderBook()}
      </div>
    );
  }

  renderBook() {
    if (this.props.book.isFetching) return;
    if (this.props.book.data.text === undefined) return;
    if (this.props.book.error) return this.renderBookError();
    return (
      <div>
        {this.props.book.data.text}
      </div>
    );
  }

  renderSeed() {
    if (this.props.book.data.text === undefined) return;
    return (
      <div>Seed: {this.props.book.data.seed}</div>
    );
  }

  renderBookError() {
    return;
  }

  processTextWithLineBreaks(text) {
    return;
  }

};

BookDisplay.propTypes = {
  book: PropTypes.object.isRequired
};
