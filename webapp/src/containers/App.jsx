import React, { PropTypes, Component } from 'react';
import { bindActionCreators }          from 'redux';
import { connect }                     from 'react-redux';
import * as ActionCreators                   from '../actions/index';
import ExampleComponent                from '../components/ExampleComponent';

class App extends Component {

  render() {
    return (
      <div>
        <ExampleComponent
          data={this.props.data}
          actionOne={this.props.actions.actionOne}
          asyncAction={this.props.actions.performAsyncAction}
          someProp={this.props.someProp}
        />
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.string.isRequired,
  someProp: PropTypes.string.isRequired
}


// connect App to redux store and export the connected version
function mapStateToProps(state) {
  return state;
}

function mapActionCreatorsToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  }
}

export default connect(
    mapStateToProps,
    mapActionCreatorsToProps)(App);
