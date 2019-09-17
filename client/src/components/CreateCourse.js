import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      materialsNeeded: '',
      estimatedTime: '',
      errors: []
    };
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Create Course</h1>
          <Form 
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Create Course"
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

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data.createCourse(course, context.authenticatedUser, context.authenticatedUserPwd)
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

  cancel = () => {
   this.props.history.push('/');
  }
}
