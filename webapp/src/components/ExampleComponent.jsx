import React, { Component, PropTypes } from 'react';

export default class ExampleComponent extends Component {

  handleClick(e) {
    this.props.actionOne('new prop');
    this.props.asyncAction();
  }

  handleBookClick(e) {
    this.props.fetchBook();
  }

  render() {
    return (
      <div>
        <header onClick={e => this.handleClick(e)}>
          <h2>{this.props.someProp}</h2>
        </header>
        <div>
          <h1 onClick={e => this.handleBookClick(e)}>Get a book</h1>
        </div>
      </div>
    )
  }
}

ExampleComponent.propTypes = {
  actionOne: PropTypes.func.isRequired,
  asyncAction: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  fetchBook: PropTypes.func,
  someProp: PropTypes.string,  // not required
}
