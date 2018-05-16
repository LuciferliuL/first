import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Link, Switch } from 'react-router-dom'
import Action from './Component/Action/Action'
import Simple from './Component/Simple/Simple'
import Table from './Component/Tables/Tables'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Link to='/Simple'>2级目录</Link>
        <Link to='/Action'>Action</Link>
        <Switch>
          <Route path='/Simple' component={Simple}></Route>
          <Route path='/Action' component={Action}></Route>
          <Route path='/Table' component={Table}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
