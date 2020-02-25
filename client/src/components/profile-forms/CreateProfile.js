import React, { useState, Fragment } from "react";
//each input is a piece of state pa trebaju state hooks tj useState
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "../../styles/CreateProfile.module.css";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    age: "",
    location: "",
    bio: "",
    interests: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    age,
    location,
    bio,
    interests,
    twitter,
    facebook,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.text}`}>
        <h2 className="large text-primary">Kreirajte profil</h2>
        <p className="lead">
          <i className={`fas fa-user ${styles.userIcon}`}></i>
          <span> Za bolji profil dodajte što više informacija</span>
        </p>
      </div>
      <div className={`container ${styles.container}`}>
        <small>* obavezno ispuniti</small>
        <br></br>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="InputAge">Unesite datum rođenja *</label>
            <input
              type="date"
              className="form-control"
              name="age"
              value={age}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputLocation">Gdje živite? *</label>
            <input
              type="text"
              placeholder="Mjesto"
              className="form-control"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputInterests">
              Navedite interese npr. film, kultura, glazba...
            </label>
            <input
              type="text"
              placeholder="Interesi"
              className="form-control"
              name="interests"
              value={interests}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputBio">Recite nam malo o sebi</label>
            <textarea
              placeholder="Kratka biografija"
              className="form-control"
              name="bio"
              value={bio}
              onChange={e => onChange(e)}
            ></textarea>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Dodajte linkove društvenih mreža koje koristite
            </button>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i
                  className={`fab fa-twitter fa-2x ${styles.icon}`}
                  style={{ color: "cornflowerblue" }}
                ></i>
                <div className={styles.social}>
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    className="form-control"
                    name="twitter"
                    value={twitter}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="form-group social-input">
                <i
                  className={`fab fa-instagram fa-2x ${styles.icon} ${styles.instagram}`}
                ></i>
                <div className={styles.social}>
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    className="form-control"
                    name="instagram"
                    value={instagram}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="form-group social-input">
                <i
                  className={`fab fa-facebook fa-2x ${styles.icon}`}
                  style={{ color: "darkblue" }}
                ></i>
                <div className={styles.social}>
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    className="form-control"
                    name="facebook"
                    value={facebook}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="form-group social-input">
                <i
                  className={`fab fa-youtube fa-2x ${styles.icon}`}
                  style={{ color: "red" }}
                ></i>
                <div className={styles.social}>
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    className="form-control"
                    name="youtube"
                    value={youtube}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
            </Fragment>
          )}

          <button type="submit" className="btn btn-primary">
            Pošalji
          </button>
          <Link className="btn btn-light ml-3" to="/dashboard">
            Natrag
          </Link>
        </form>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

// withRouter dozvaljava da koristimo history object
export default connect(null, { createProfile })(withRouter(CreateProfile));
