import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import styles from "../../styles/auth.module.css";
import PropTypes from "prop-types";
import Wrapper from '../layout/Wrapper';

const Register = ({ setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {

      setAlert("Lozinke se ne podudaraju", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>
      <div className={`container ${styles.container}`}>
        <h3 style = {{color: "#007bff"}}>Registracija</h3>
        <br></br>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Ime</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Unesite ime"
              required
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Unesite email"
              required
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Unesite lozinku"
              minLength="6"
              required
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Potvrdite lozinku</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="Potvrdite lozinku"
              minLength="6"
              required
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <button type="submit" value="submit" className="btn btn-primary">
            Registracija
          </button>
        </form>
        <br></br>
        <h6>
          Već ste registrirani? Prijavite se <Link to="/">ovdje</Link>.
        </h6>
      </div>
    </Wrapper>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);