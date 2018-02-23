import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

class Home extends Component {
  clickLogout() {
    utils.logout();
  }

  render() {
    return (
      <div>
        <div className="welcome">Welcome to Drag&amp;Drop Forever</div>
        <Link to="/login" className="logout" onClick={this.clickLogout}>Logout</Link>
        <div className="drag image"/>
      </div>
    );
  }
}

export default Home;