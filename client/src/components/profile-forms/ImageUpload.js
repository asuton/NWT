import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar } from '../../actions/profile';

const UploadImages = ({ uploadAvatar, history }) => {
  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'dggse3lsx',
      uploadPreset: 'avatar',
      cropping: 'server'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        let image = result.info.secure_url;
        uploadAvatar(image, history);
      }
    }
  );

  return (
    <Fragment>
      <h1 className='large text-primary'>Učitajte profilnu</h1>{' '}
      <button
        className='btn btn-primary my-1'
        onClick={() => {
          myWidget.open();
        }}
      >
        Upload Avatar
      </button>
    </Fragment>
  );
};

UploadImages.propTypes = {
  uploadAvatar: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    uploadAvatar
  }
)(withRouter(UploadImages));