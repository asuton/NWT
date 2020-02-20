import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Wrapper from "../layout/Wrapper";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  //preusmjeri na dashboard, nama na feed?
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>
      <div className={`container ${styles.container}`}>
        <h3 style = {{color: "#007bff"}}>Prijava</h3>
        <br></br>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Unesite email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Lozinka</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Prijava
          </button>
        </form>
        <br></br>
        <h6>
          Nemate profil? Registrirajte se <Link to="/register">ovdje</Link>.
        </h6>
      </div>
    </Wrapper>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
