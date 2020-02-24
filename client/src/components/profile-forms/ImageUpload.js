import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar, getCurrentProfile } from '../../actions/profile';
import Wrapper from '../layout/Wrapper';
import styles from '../../styles/upload.module.css';
import Spinner from '../layout/Spinner';
import Slika from '../../images/preuzmi.png'

const UploadImages = ({ uploadAvatar, getCurrentProfile, history, profile: {profile, loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if(typeof(window) === 'undefined' || loading || profile === null){
    return <Spinner></Spinner>;
  }
  else {
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dggse3lsx',
        uploadPreset: 'avatar',
        cropping: 'true',
        croppingAspectRatio: 1,
        croppingCoordinatesMode: 'custom',
        showSkipCropButton: 'false'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          let image = result.info.secure_url;
          uploadAvatar(image, history);
        }
      }
    );

    return (
      <Wrapper>
        <div className = {`${styles.wrapper}`}>
          <div className = {`${styles.menu}`}>
            <h1 className='large text-primary' style = {{textAlign: "center"}}>Učitajte sliku za profil</h1>{' '}
            <button
              className='btn btn-primary my-1'
              onClick={() => {
                myWidget.open();
              }}
            >
              <i class="fa fa-upload" aria-hidden="true"></i>{' '}Učitaj
            </button>
          </div>
          <div className = {`${styles.menu}`}>
            <h3 className='text-primary' style = {{textAlign: "center"}}>Trenutna profilna</h3>
          {!loading ? (profile.image && <img src={profile.image} alt="" style = {{height: "300px", width: "300px"}} className="mx-auto rounded-circle img-fluid"/>) :
            (<img src={Slika} alt="" style = {{height: "300px", width: "300px"}} className="mx-auto rounded-circle img-fluid"/>)
            }
          </div>
        </div>
      </Wrapper>
    );
  }
};

UploadImages.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { uploadAvatar, getCurrentProfile })(withRouter(UploadImages));