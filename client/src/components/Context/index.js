import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from '../../Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    authenticatedUserPwd: Cookies.getJSON('authenticatedUserPwd') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, authenticatedUserPwd } = this.state;
    const value = {
      authenticatedUser,
      authenticatedUserPwd,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          authenticatedUserPwd: password,
        };
      });
      
      const cookieOptions = {
        expires: 1 // 1 day
      };
      
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
      Cookies.set('authenticatedUserPwd', password, cookieOptions);
      //same as
      //Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
      //this doesn't work
      //Cookies.set('authenticatedUser', JSON.stringify(user), {{expires: 1}});
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null, authenticatedUserPwd: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('authenticatedUserPwd');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

