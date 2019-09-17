import config from './config';

//Contains methods for interacting with the api application
//all methods are designated async since the React components using these are themselves asynch
//each uses method api and awaits its return results before proceeding (fetch is async)

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api('/courses/', 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }

  async getCourseById(id) {
    const response = await this.api('/courses/' + id, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }

  async createCourse(course, user, password) {
    const username = user.emailAddress;
    const response = await this.api('/courses', 'POST', course, true, {username, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }

  async updateCourse(course, id, user, password) {
    const username = user.emailAddress;
    const response = await this.api('/courses/' + id, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }

  async deleteCourse(id, user, password) {
    const username = user.emailAddress;
    const response = await this.api('/courses/' + id, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    //reached if 500 or any other status code
    else {
      throw new Error();
    }
  }
}
