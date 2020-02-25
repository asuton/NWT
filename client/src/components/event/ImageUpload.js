import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadCover } from '../../actions/event';
import styles from '../../styles/upload.module.css';
import Spinner from '../layout/Spinner';

const UploadImages = ({ uploadCover, history, eventId }) => {

  if(typeof(window) === 'undefined'){
    return <Spinner></Spinner>;
  }
  else {
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dggse3lsx',
        uploadPreset: 'events',
        cropping: 'true',
        croppingAspectRatio: 3,
        croppingCoordinatesMode: 'custom',
        showSkipCropButton: 'false'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          let image = result.info.secure_url;
          uploadCover(eventId, image, history);
        }
      }
    );

    return (
      <Fragment>
            <button
              className='btn btn-outline-dark my-1'
              onClick={() => {
                myWidget.open();
              }}
            >
              <i class="fa fa-upload" aria-hidden="true"></i>{' '}Učitajte sliku za događaj
            </button>
      </Fragment>
    );
  }
};

UploadImages.propTypes = {
  uploadCover: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { uploadCover })(withRouter(UploadImages));