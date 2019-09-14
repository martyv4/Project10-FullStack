import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
  constructor() {
    super();

    this.state = {
      emailAddress: '',
      password: '',
      errors: []
    };
  }
  
  render() {
    return <div className="bounds">
    <div className="grid-33 centered signin">
      <h1>Sign In</h1>
      <Form 
        cancel={this.cancel}
        errors={this.state.errors}
        submit={this.submit}
        submitButtonText="Sign In"
        elements={() => (
          <React.Fragment>
            <input 
              id="emailAddress" 
              name="emailAddress" 
              type="text"
              value={this.state.emailAddress} 
              onChange={this.change} 
              placeholder="User Name" />
            <input 
              id="password" 
              name="password"
              type="password"
              value={this.state.password} 
              onChange={this.change} 
              placeholder="Password" />                
          </React.Fragment>
        )} />
      <p>
        Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
      </p>
    </div>
  </div>
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }

}

export default UserSignIn;
