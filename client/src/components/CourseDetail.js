import React, { Component } from 'react';
import config from '../config';

class CourseDetail extends Component {
  constructor () {
    //execute default constructor
    super();

    //default state: courses empty array, isLoading boolean true
    this.state = {
      course: null,
      isLoading: true,
      courseWasFound: false
    };
  }

  fetchCourseById = (courseId) => {
    //when loading the page, empty the state variables
    //so the render will show default state while the courses load
    this.setState({ course: null, isLoading: true, courseWasFound: false });
    
    //construct uri for REST API from Project 9
    const uri = config.apiBaseUrl  + "/courses/" + courseId;
    
    //HTTP GET the URI, 
    //convert the response data to JSON, 
    //assign the courses state variable and set state isLoading to false, 
    //signifying the courses are loaded
    fetch(uri)
    .then(response => response.json())
    .then(responseData => {
      if (responseData.id)
      {
        this.setState({ course: responseData, isLoading: false, courseWasFound: true });
      }
      else
      {
        this.setState({ course: responseData, isLoading: false, courseWasFound: false });
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  convertJsonToCourseContent = (course, courseWasFound) => {
    if (courseWasFound)
    {
    return <div className="bounds course--detail">
    <div className="grid-66">
    <div className="course--header">
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{course.title}</h3>
      <p>By {course.user.firstName} {course.user.lastName}</p>
    </div>
    <div className="course--description">
        {/*todo: split description on line breaks to <p> tags */}
      <p>{course.description}</p>
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
          <ul> {/*todo: split description on line breaks to <li> tags */}
            <li>{course.materialsNeeded}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  </div>
    }
    else
    {
        return <div className="bounds course--detail">
        <div className="grid-66">
        <div className="course--header">
            Course Not Found!
            </div>
            </div>
            </div>
    }
  }

  componentDidMount() {
    this.fetchCourseById(this.props.match.params.id);
  }

  render() {
    let courseFound = null;
    let opsButtons = '';
 
    //if the courses array has content display them
     if (this.state.course)
     {
        courseFound = this.convertJsonToCourseContent(this.state.course, this.state.courseWasFound);
     }
     
     //if this.state.course remains null, 
     //and the this.state.isLoading is false, 
     //then this must be an empty search: load NotFound component
       else if (!this.state.isLoading)
       {
        courseFound = <li>Course not found...</li>;
       }
       //otherwise, display the generic Loading panel
       else
       {
        courseFound = <li>Loading...</li>;
       }
       
       if (this.state.courseWasFound)
       {
            opsButtons = <span><a className="button" href={"/courses/edit/" + this.props.match.params.id}>Update Course</a><a className="button" href={"/courses/delete/" + this.props.match.params.id}>Delete Course</a></span>
       }

       //render the course-container with the content and courseList variables within
     return <div>
     <div className="actions--bar">
       <div className="bounds">
       <div className="grid-100">{opsButtons}
            <a className="button button-secondary" href="/courses/">Return to List</a></div>
       </div>
     </div>
       {courseFound}
   </div>;

  }

}

export default CourseDetail;
