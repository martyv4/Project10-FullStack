import React from "react";

//import necessary Components from react-router-dom module
//https://reacttraining.com/react-router/web/example/url-params
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

//import our Components to be displayed in this Router.js Component
import Courses from './Courses';
import CourseDetail from './CourseDetail';
import Error from './Error';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Courses} />   
        <Route exact path="/signin/" component={UserSignIn} />
        <Route exact path="/signup/" component={UserSignUp} />
        <Route exact path="/signout/" component={UserSignOut} />
        <Route exact path="/courses/" component={Courses} />
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default AppRouter;