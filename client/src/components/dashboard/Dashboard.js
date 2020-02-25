import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile } from "../../actions/profile";
import DashboardEvents from "./DashboardEvents";
import styles from '../../styles/dashboard.module.css';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return ( !loading ? (
    <Fragment>
      <div className = {styles.title}>
        <h1 className="large text-primary">Event App</h1>
        <p className="lead">
          <i className="fas fa-user" style = {{color: "#007bff"}} /> Dobrodošli {user && user.name}
        </p>
      </div>
      {!loading && profile !== null ? (
        <Fragment>
          <DashboardActions />
          <br></br>
          <hr></hr>
          <div className = "container">
            <DashboardEvents></DashboardEvents>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className = "mx-2"style = {{textAlign: "center"}}>Niste još postavili profil, molimo Vas dodajte Vaše informacije</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Kreiraj profil
          </Link>
        </Fragment>
      )}
    </Fragment>) : (<Spinner></Spinner>)
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);