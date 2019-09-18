import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Data from '../Data';

//react-Markdown Support for Course Detail - description and materialsNeeded

import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  constructor () {
    //execute default constructor
    super();

    //default state: courses empty array, isLoading boolean true
    this.state = {
      course: null,
      isLoading: true,
      courseWasFound: false,
      id: null
    };

    this.deleteCourse = this.deleteCourse.bind(this);
  }

  fetchCourseById = (courseId) => {
    //when loading the page, empty the state variables
    //so the render will show default state while the courses load
    this.setState({ course: null, isLoading: true, courseWasFound: false });
    
    const data = new Data();

    //construct uri for REST API from Project 9
    //const uri = config.apiBaseUrl  + "/courses/" + courseId;
    
    //HTTP GET the URI, 
    //convert the response data to JSON, 
    //assign the courses state variable and set state isLoading to false, 
    //signifying the courses are loaded

    /*
    fetch(uri)
    .then(response => response.json())
    */
    data.getCourseById(courseId)
    .then(responseData => {
      if (responseData.id)
      {
        this.setState({ course: responseData, isLoading: false, courseWasFound: true, id: responseData.id });
      }
      else
      {
        this.setState({ course: responseData, isLoading: false, courseWasFound: false, id: -1 });
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  convertJsonToCourseContent = (course) => {
    return <div className="bounds course--detail">
    <div className="grid-66">
    <div className="course--header">
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{course.title}</h3>
      <p>By {course.user.firstName} {course.user.lastName}</p>
    </div>
    <div className="course--description">
        
      <p><ReactMarkdown>{course.description}</ReactMarkdown></p>
      
    </div>
  </div>
  <div className="grid-25 grid-right">
    <div className="course--stats">
      <ul className="course--stats--list">
        <li className="course--stats--list--item">
          <h4>Estimated Time</h4>
          
          <h3>{course.estimatedTime}</h3>
        </li>
        <li className="course--stats--list--item">
          <h4>Materials Needed</h4>
          <ul> 
            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  </div>
  }

  componentDidMount() {
    this.fetchCourseById(this.props.match.params.id);
  }

  render() {
    let courseFound = null;
    
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    //if the courses array has content display them
     if (this.state.course)
     {
       if (this.state.courseWasFound) {
        courseFound = this.convertJsonToCourseContent(this.state.course);
      }
      else
      {
        return <Redirect to='/notfound' />
      }
     }
     
       //don't need to check this.state.isLoading - if we get here
       //no course has been loaded yet
       //otherwise, display the generic Loading panel
       else
       {
        courseFound = <li>Loading...</li>;
       }
 
       //render the course-container with the content and courseList variables within
     return <div>
     <div className="actions--bar">
       <div className="bounds">
       <div className="grid-100">
         {/* inline conditional: if a course was found, and a user is logged in and that user's id matches the courses's user's id, show the update and delete buttons. If not, show nothing */}
         {this.state.courseWasFound && authUser && authUser.id === this.state.course.user.id ? (
              <React.Fragment>
                <span><a className="button" href={"/courses/" + this.props.match.params.id + "/update"}>Update Course</a><button className="button" onClick={this.deleteCourse}>Delete Course</button></span>
              </React.Fragment>
            ) : (
              <React.Fragment>
              </React.Fragment>
            )}
            <a className="button button-secondary" href="/courses/">Return to List</a></div>
       </div>
     </div>
       {courseFound}
   </div>;

  }

  deleteCourse = () => {
    const { context } = this.props;

    const id = this.state.id;

    context.data.deleteCourse(id, context.authenticatedUser, context.authenticatedUserPwd)
      .then( courseCreateResult => {
        if (!courseCreateResult.length) {
          //would be great to redirect user to the Location value in the HTTP header of the response, but:
          //https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
          //Can't access Location header in CORS
          //go back to course list instead...
          this.props.history.push('/');

        } else {
          //THIS SHOULD NEVER BE REACHED - createCourse should always return something
          //if no response from POST /courses go to the general error page
          this.props.history.push('/error');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

}



export default CourseDetail;
