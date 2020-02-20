import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile } from "../../actions/profile";
import Wrapper from "../layout/Wrapper";
//zeli pozvati getCurrentProfile cim se ovo ucita,
//buduci da se za to koriste hooks treba importat use effect

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  //ako je profile null i jos uvijek se loada zelimo prikazati spinner
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Wrapper>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" style = {{color: "#007bff"}} /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>Niste još postavili profil, molimo Vas dodajte Vaše informacije</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Kreiraj profil
          </Link>
        </Fragment>
      )}
    </Wrapper>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  //potreban auth i profile state
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
