import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <a className={styles.link} onClick={logout} href="/">
            <div className={styles.button}>Logout</div>
          </a>
        </div>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <Link className={styles.link} to="/register">
            <div className={styles.button}>Registracija</div>
          </Link>
        </div>
      </div>
    </Fragment>
  );

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light fixed-top py-0 pl-2 ${styles.navbar}`}
    >
      <div className="container">
        <Link className={`${styles.link} ${styles.font}`} to="/">
          <div className={styles.button}>Event App</div>
        </Link>
      </div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
