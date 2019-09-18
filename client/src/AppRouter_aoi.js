import React from "react";

//import necessary Components from react-router-dom module
//https://reacttraining.com/react-router/web/example/url-params
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import our Components to be displayed in this Router.js Component
import Header from './components/Header';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

import PrivateRoute from './PrivateRoute';

import withContext from './components/Context';

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function AppRouter() {
  return (
    <Router>
      <div>
      <Route render={({location})=> <HeaderWithContext location={location.pathname} />} />
      <Switch>
        <Route exact path="/" component={Courses} />   
        {/** <Route exact path="/signin" render={(props) => <UserSignInWithContext {...props} />} /> }**/
        <Route exact path="/signin" component={UserSignInWithContext} />} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/forbidden" component={Forbidden} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;
