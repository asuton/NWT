import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
//Redux
//sve komponente omotat providerom kako bi sve imale pristup stateovima
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ImageUpload from "./components/profile-forms/ImageUpload";

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
          <div className="vertical-center">
            <Alert></Alert>
            <Switch>
              <Route exact path="/" component={Landing}></Route>
              <Route exact path="/register" component={Register}></Route>
              {/* koristiti PrivateRoute za one stranice koje samo logirani korinsik vidi */}
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/edit-profile-picture"
                component={ImageUpload}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/profiles"
                component={Profiles}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/profile/:id"
                component={Profile}
              ></PrivateRoute>
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
