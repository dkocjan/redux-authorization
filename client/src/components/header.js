import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show link to sign out
      return (
        <li className="nav-item" key={ 1 }>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      )
    } else {
      // show links to sign in and up
      return [
        <li className="nav-item" key={ 2 }>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={ 3 }>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-xl navbar-light bg-faded">
        <Link to="/" className="navbar-brand">Start</Link>
          <ul className="navbar-nav">
            { this.renderLinks() }
                    <li className="nav-item" key={ 4 }>
          <Link className="nav-link" to="/resources">Resources</Link>
        </li>
          </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);