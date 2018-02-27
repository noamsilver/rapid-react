import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as utils from '../utils';
import '../../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      message: ""
    });
  }

  clickLogin() {
    if (this.state.username && this.state.password) {
      if (utils.login(this.state.username, this.state.password)) {
        this.props.history.push('/');
      } else {
        this.setState({
          message: 'Invalid password'
        })
      }
    } else {
      this.setState({
        message: 'Fill credentials'
      })
    }
  }

  render() {
    return (
      <div className="box">
        <div className="title">Drag&amp;Drop Forever</div>
        <input type="text" name="username" id="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
        <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
        <div className="login button" onClick={this.clickLogin}>Login</div>
        <div className="error message">{this.state.message}</div>
      </div>
    );
  }
}

export default withRouter(Login);