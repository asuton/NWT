import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
//Redux
//sve komponente omotat providerom kako bi sve imale pristup stateovima
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store = {store}> 
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <section className = "vertical-center">
            <Switch>
              <Route exact path = '/' component = {Landing}></Route>
              <Route exact path = "/register" component = {Register}></Route>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;