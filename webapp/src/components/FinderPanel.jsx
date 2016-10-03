import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class FinderPanel extends Component {
  constructor(props) {
    super(props);

    this.getBook = this.getBook.bind(this);

    this.state = {
      error: null
    };
  }

  render() {
    let spinnerClasses = classNames({
      "hume-spinner": true,
      pulse: this.props.isFetching
    });

    return (
      <div className="finder-panel">
        {this.renderError()}
        <form onSubmit={this.getBook}>
          <button type="submit">
            Get a book
          </button>
          <input name="seed" type="text" placeholder="seed" />
        </form>
        <div className={spinnerClasses}></div>
      </div>
    );
  }

  getBook(e) {
    e.preventDefault();
    let seed = e.target.seed.value;
    let valid = this.checkSeedValidity(seed);
    if (!valid) {
      this.setState({ error: "Invalid seed. Seed must be integer." });
      return;
    }
    this.props.getABook(seed);
  }

  checkSeedValidity(seed) {
    // we can't used parseInt because it's annoying and will return an int so long
    // as the first character of the string it's given is an int.
    // parseInt("1asdfas") === 1, not NaN. So we use unary plus operator.
    let n = +seed;
    return !isNaN(n);
  }

  renderError() {
    if (this.state.error === null) return;

    return (
      <div className="error">
        <h2 className="error-message">{this.state.error}</h2>
      </div>
    );
  }
}

FinderPanel.propTypes = {
  getABook: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
