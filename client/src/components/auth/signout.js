import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div className="alert alert-info">
      <h5>Good bye! </h5>
      <p>Hope to see you soon... <span>( ͡° ͜ʖ ͡°)</span></p>
    </div>;
  }
}

export default connect(null, actions)(Signout);