import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';
import '../../styles/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickPosition: undefined,
      dx: 0,
      dy: 0,
      position: utils.getSessionToken().position
    }

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  clickLogout() {
    utils.logout();
  }

  mouseDown(event) {
    event.preventDefault();
    if (event.pageX && event.pageY) {
      this.setState({
        clickPosition: { x: event.pageX, y: event.pageY }
      })
    }
  }

  mouseMove(event) {
    event.preventDefault();
    if (this.state.clickPosition) {
      this.setState({
        dx: event.pageX - this.state.clickPosition.x,
        dy: event.pageY - this.state.clickPosition.y
      })
    }
  }

  mouseUp(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.clickPosition) {
      const x = this.state.position.x + this.state.dx;
      const y = this.state.position.y + this.state.dy;
      utils.updatePosition(x, y);
      this.setState({
        clickPosition: undefined,
        dx: 0,
        dy: 0,
        position: { x, y }
      });
    }
  }

  render() {
    return (
      <div className="content" onMouseUp={this.mouseUp} onMouseLeave={this.mouseUp} onMouseMove={this.mouseMove}>
        <div className="welcome">Welcome to Drag&amp;Drop Forever
          <Link to="/login" className="logout" onClick={this.clickLogout}>Logout</Link>
        </div>
        <div className="drag image" style={{ left: this.state.position.x + this.state.dx, top: this.state.position.y + this.state.dy }} onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}/>
      </div>
    );
  }
}

export default Home;