import React, { useState, Fragment, useEffect } from "react";
//each input is a piece of state pa trebaju state hooks tj useState
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "../../styles/CreateProfile.module.css";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "../layout/Alert";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    age: "",
    location: "",
    bio: "",
    interests: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: "",
    date: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      age: loading || !profile.age ? "" : profile.age,
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      interests: loading || !profile.interests ? "" : profile.interests,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading]);

  const {
    age,
    location,
    bio,
    interests,
    twitter,
    facebook,
    youtube,
    instagram,
    date
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <Alert></Alert> <h1 className="large text-primary">Kreirajte profil</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Za bolji profil dodajte što više informacija
      </p>
      <div className={`container ${styles.container}`}>
        <small>* obavezno ispuniti</small>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <small className="form-text">Unesite datum rođenja *</small>
            <input
              type="date"
              name="age"
              value={age}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Gdje živite? *</small>
            <input
              type="text"
              placeholder="mjesto"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Navedite interese npr. film, kultura, glazba
            </small>
            <input
              type="text"
              placeholder="interesi"
              name="interests"
              value={interests}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Recite nam malo o sebi</small>
            <textarea
              placeholder="kratka biografija"
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
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={e => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Natrag
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

// withRouter dozvaljava da koristimo history object
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
