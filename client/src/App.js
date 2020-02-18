import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
//sve komponente omotat providerom kako bi sve imale pristup stateovima
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //when the state updates useEffect will keep running, constant loop
  //osim ako ne dodamo [] kao drugi parametar, onda se pokrene samo jednom
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <section className="vertical-center">
            <Switch>
              <Route exact path="/" component={Landing}></Route>
              <Route exact path="/register" component={Register}></Route>
              {/* koristiti PrivateRoute za one stranice koje samo logirani korinsik vidi */}
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
