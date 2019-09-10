import React from "react";

//import necessary Components from react-router-dom module
//https://reacttraining.com/react-router/web/example/url-params
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

//import our Components to be displayed in this Router.js Component
import Courses from './Courses';
import CourseDetail from './CourseDetail';
import Error from './Error';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Courses} />   
        <Route exact path="/courses/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default AppRouter;