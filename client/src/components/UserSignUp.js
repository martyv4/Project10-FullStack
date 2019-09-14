import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      emailAddress: '',
      password: '',
      errors: []
    };
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={this.state.name} 
                  onChange={this.change} 
                  placeholder="Name" />
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
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
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

    const name = this.state.name;
    const emailAddress = this.state.emailAddress;
    const password = this.state.password;

    // Create user
    const user = {
      name,
      emailAddress,
      password,
    };

    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
