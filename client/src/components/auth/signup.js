import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm}} = this.props
    return (
      <div className="row">
        <div className="col-xs-12 col-md-9 col-lg-6">
          <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
            <fieldset className="form-group clearfix">
              <label>Email:</label>
              <input className="form-control" { ...email } />
            </fieldset>
            <fieldset className="form-group">
              <label>Password:</label>
              <div className="badge badge-pill badge-danger error">
                { email.touched && email.error }
                { email.touched && password.touched && passwordConfirm.touched && this.renderAlert() }
              </div>
              <input className="form-control" type="password" { ...password } />
            </fieldset>
            <fieldset className="form-group">
              <label>Confirm Password:</label>
              <div className="badge badge-pill badge-danger error">
                { password.touched && password.error }
              </div>
              <input className="form-control" type="password" { ...passwordConfirm } />
            </fieldset>
            <button action="submit" className="btn btn-secondary">Sign up</button>
            <div className="badge badge-pill badge-danger error">
              { passwordConfirm.touched && passwordConfirm.error }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirm';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);