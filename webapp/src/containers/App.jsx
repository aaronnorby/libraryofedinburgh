import React, { PropTypes, Component } from 'react';
import { bindActionCreators }          from 'redux';
import { connect }                     from 'react-redux';
import { fetchBook }                   from '../actions/index';
import BookDisplay from '../components/BookDisplay';
import FinderPanel from '../components/FinderPanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.getABook = this.getABook.bind(this);
  }

  getABook(seed) {
    const { dispatch } = this.props;
    dispatch(fetchBook(seed));
  }

  render() {
    return (
      <div>
        <FinderPanel
          getABook={this.getABook}
          isFetching={this.props.book.isFetching} />
        <BookDisplay
          book={this.props.book} />
      </div>
    )
  }
}

App.propTypes = {
  book: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}


// connect App to redux store state and export the connected version
function mapStateToProps(state) {
  const { book } = state;
  return {
    book: book
  };
}

export default connect(
    mapStateToProps
)(App);
