import React, { Component } from 'react';
import Data from '../Data';

class Courses extends Component {
  constructor () {
    //execute default constructor
    super();

    //default state: courses empty array, isLoading boolean true
    this.state = {
      courses: [],
      isLoading: true
    };
  }

  fetchCourses = () => {
    //when loading the page, empty the state variables
    //so the render will show default state while the images load
    this.setState({ courses: [], isLoading: true });

    const data = new Data();
    
    //construct uri for REST API from Project 9
    //const uri = config.apiBaseUrl + "/courses";
    
    //HTTP GET the URI, 
    //convert the response data to JSON, 
    //assign the courses state variable and set state isLoading to false, 
    //signifying the courses are loaded
    
    /*
    fetch(uri)
    .then(response => response.json())
    */
    data.getCourses()
    .then(responseData => {
      this.setState({ courses: responseData, isLoading: false });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  mapJsonToCourseLink = (course, i) => {
    return <div className="grid-33" key={i}><a className="course--module course--link" href={"/courses/" + course.id }>
    <h4 className="course--label">Course</h4>
    <h3 className="course--title">{course.title}</h3>
  </a></div>;
  }

  componentDidMount() {
    this.fetchCourses();
  }

  render() {
    let courseList = [];
 
    //if the courses array has content display them
     if (this.state.courses.length > 0)
     {
      courseList = this.state.courses.map(this.mapJsonToCourseLink);
     }
     
     //if there are no courseList in the array, and the isLoading is false, then this must be an empty search: load NotFound component
       else if (!this.state.isLoading)
       {
        courseList = <li>No results found...</li>;
       }
       //otherwise, display the generic Loading panel
       else
       {
        courseList = <li>Loading...</li>;
       }
       
       //render the course-container with the content and courseList variables within
     return <div>
     <div className="bounds">
       {courseList}
       <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
           <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               viewBox="0 0 13 13" className="add">
               <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
             </svg>New Course</h3>
         </a></div>
     </div>
   </div>;

  }

}

export default Courses;
