import React from "react";

//import necessary Components from react-router-dom module
//https://reacttraining.com/react-router/web/example/url-params
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import our Components to be displayed in this Router.js Component
import Header from './components/Header';
import Error from './components/Error';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import PrivateRoute from './components/PrivateRoute';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function AppRouter() {
  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />   
        <Route exact path="/signin/" component={UserSignInWithContext} />
        <Route exact path="/signup/" component={UserSignUpWithContext} />
        <Route exact path="/signout/" component={UserSignOutWithContext} />
        <Route exact path="/courses/" component={Courses} />
        <PrivateRoute exact path="/courses/create" component={CreateCourse} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default AppRouter;