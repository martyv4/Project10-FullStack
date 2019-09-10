import React, { Component } from 'react';

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
    //so the render will show default state while the images load
    this.setState({ courses: [], isLoading: true });
    
    //construct uri for REST API from Project 9
    const uri = "http://localhost:5000/api/courses/" + courseId;
    
    //HTTP GET the URI, convert the response data to JSON, assign the courses state variable and set state isLoading to false, signifying the courses are loaded
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

  mapJsonToCourseContent = (course, courseWasFound) => {
    if (courseWasFound)
    {
    return <div class="bounds course--detail">
    <div class="grid-66">
    <div class="course--header">
      <h4 class="course--label">Course</h4>
      <h3 class="course--title">{course.title}</h3>
      <p>By Joe Smith</p>
    </div>
    <div class="course--description">
        {/*todo: split description on line breaks to <p> tags */}
      <p>{course.description}</p>
    </div>
  </div>
  <div class="grid-25 grid-right">
    <div class="course--stats">
      <ul class="course--stats--list">
        <li class="course--stats--list--item">
          <h4>Estimated Time</h4>
          <h3>{course.estimatedTime}</h3>
        </li>
        <li class="course--stats--list--item">
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
        return <div class="bounds course--detail">
        <div class="grid-66">
        <div class="course--header">
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
        courseFound = this.mapJsonToCourseContent(this.state.course, this.state.courseWasFound);
     }
     
     //if there are no courseList in the array, and the isLoading is false, then this must be an empty search: load NotFound component
       else if (!this.state.isLoading)
       {
        courseFound = <li>Loading...</li>;
       }
       //otherwise, display the generic Loading panel
       else
       {
        courseFound = <li>Loading...</li>;
       }
       
       if (this.state.courseWasFound)
       {
            opsButtons = <span><a class="button" href={"/courses/edit/" + this.props.match.params.id}>Update Course</a><a class="button" href={"/courses/delete/" + this.props.match.params.id}>Delete Course</a></span>
       }

       //render the course-container with the content and courseList variables within
     return <div>
     <div class="actions--bar">
       <div class="bounds">
       <div class="grid-100">{opsButtons}
            <a class="button button-secondary" href="/courses/">Return to List</a></div>
       </div>
     </div>
       {courseFound}
   </div>;

  }

}

export default CourseDetail;
