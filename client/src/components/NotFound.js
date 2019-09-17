import React from 'react';

//Error component - home and gallery routes are not reached
const NotFound = () => {
    return (
      <div>
      <div className="actions--bar">
        <div className="bounds">
        <div className="grid-100">
             <a className="button button-secondary" href="/courses/">Return to List</a></div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
        <div className="course--header">
            Sorry, Page Not Found!
            </div>
            </div>
            </div>
    </div>
    )
}

export default NotFound;