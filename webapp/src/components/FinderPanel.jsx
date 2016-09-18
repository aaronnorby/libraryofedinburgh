import React, { Component, PropTypes } from 'react';

export default class FinderPanel extends Component {
  constructor(props) {
    super(props);

    this.getBook = this.getBook.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this.getBook}>
          Get a book
        </button>
        <input type="text" placeholder="seed" />
      </div>
    );
  }

  getBook(e) {
    let seed;
    this.props.getABook(seed);
  }
}

FinderPanel.propTypes = {
  getABook: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
