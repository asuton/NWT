import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../auth/Login";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Landing Page zasad samo ima Login komponentu jer nez ako cemo nesto nadodavat

const Landing = ({ isAuthenticated }) => {
  //promijeniti na feed kasnije?
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Login></Login>;
};

//ovo se dodaje kako logirani korisnik ne bi mogao posjetiti landing page
// (iako nama je i bez ovoga ne moze posjetit jer je nama to samo login)?
// (sto nam je postavljeno u routing/PrivateRoute
//!isAuthenticated && !loading ? (<Redirect to="/" />  ) : (<Component {...props} />) s ovim?
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
