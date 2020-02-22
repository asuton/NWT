import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar } from '../../actions/profile';
import Wrapper from '../layout/Wrapper';
import styles from '../../styles/upload.module.css';

const UploadImages = ({ uploadAvatar, history, profile: { profile } }) => {

  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'dggse3lsx',
      uploadPreset: 'avatar',
      cropping: 'server',
      croppingAspectRatio: 1
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
            Učitaj
          </button>
        </div>
        <div>
          <h3 className='text-primary' style = {{textAlign: "center"}}>Trenutna profilna</h3>
        {profile.image && <img src={profile.image} alt="" style = {{maxHeight: "200px"}} className="mx-auto rounded-circle img-fluid"/>}
        </div>
      </div>
    </Wrapper>
  );
};

UploadImages.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { uploadAvatar })(withRouter(UploadImages));