import React, { Component } from 'react';
import CourseForm from './CourseForm';
import { Redirect } from 'react-router-dom';

export default class UpdateCourse extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      materialsNeeded: '',
      estimatedTime: '',
      id: null,
      courseUserId: null,
      errors: []
    };
  }

  fetchCourseById = (courseId) => {
    //when loading the page, empty the state variables
    //so the render will show default state while the courses load
    this.setState({ title: '', description: '', materialsNeeded: '', estimatedTime: '', isLoading: true, id: null, courseUserId: null, courseWasFound: false });
    
    const { context } = this.props;

    //construct uri for REST API from Project 9
    //const uri = config.apiBaseUrl  + "/courses/" + courseId;
    
    //HTTP GET the URI, 
    //convert the response data to JSON, 
    //assign the courses state variable and set state isLoading to false, 
    //signifying the courses are loaded
    //fetch(uri)
    //.then(response => response.json())
    context.data.getCourseById(courseId)
    .then(responseData => {
      if (responseData.id)
      {
        this.setState({ title: responseData.title, description: responseData.description, materialsNeeded: responseData.materialsNeeded, estimatedTime: responseData.estimatedTime, isLoading: false, id: responseData.id, courseUserId: responseData.user.id, courseWasFound: true });
      }
      else
      {
        this.setState({  title: '', description: '', materialsNeeded: '', estimatedTime: '', isLoading: false, id: -1, courseUserId: -1, courseWasFound: false });
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  componentDidMount() {
    this.fetchCourseById(this.props.match.params.id);
  }

  render() {
    const { context } = this.props;
    if (this.state.id)
    {
      if (!this.state.courseWasFound) {
        return <Redirect to='/notfound' />
      }
      if (context.authenticatedUser.id !== this.state.courseUserId) {
        return <Redirect to='/forbidden' />
      }
    }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Update Course</h1>
          <CourseForm 
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <input 
                  id="title" 
                  name="title" 
                  type="text"
                  value={this.state.title} 
                  onChange={this.change} 
                  placeholder="Title" />
                  <input 
                  id="description" 
                  name="description" 
                  type="description"
                  value={this.state.description} 
                  onChange={this.change} 
                  placeholder="Description" />
                <input 
                  id="estimatedTime" 
                  name="estimatedTime" 
                  type="text"
                  value={this.state.estimatedTime} 
                  onChange={this.change} 
                  placeholder="Estimated Time" />
                <input 
                  id="materialsNeeded" 
                  name="materialsNeeded"
                  type="materialsNeeded"
                  value={this.state.materialsNeeded} 
                  onChange={this.change} 
                  placeholder="Materials Needed" />
              </React.Fragment>
            )} />
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

    const title = this.state.title;
    const description = this.state.description;
    const estimatedTime = this.state.estimatedTime;
    const materialsNeeded = this.state.materialsNeeded;
    const id = this.state.id;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data.updateCourse(course, id, context.authenticatedUser, context.authenticatedUserPwd)
      .then( courseUpdateResult => {
        if (!courseUpdateResult.length) {
          this.props.history.push('/courses/' + id);

        } else {
          this.props.history.push('/error');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
    this.props.history.push('/courses/' + this.props.match.params.id);
  }
}
