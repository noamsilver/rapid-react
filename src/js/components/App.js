import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import * as utils from '../utils';

class App extends Component {
  isLoggedIn() {
    return utils.getSessionToken() ? true : false;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => !this.isLoggedIn() && <Redirect to="/login"/>}/>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route exact path="/" component={Home}/>
            <Route path="/" render={() => <Redirect to="/"/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;