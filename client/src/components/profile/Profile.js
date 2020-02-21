import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Social from './Social';
import Interests from './Interests';
import Bio from './Bio';
import About from './About';
import styles from '../../styles/profileInfo.module.css';
import Events from './Events';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <div className = "container">
            <div className = "row">
            { profile === null || loading ? <Spinner></Spinner> :
                <Fragment>
                    <div className = "container">
                        <Link to = '/profiles'>
                            <button className = "btn btn-primary" style = {{marginRight: "10px", paddingBottom: "5px"}}>
                                Natrag na profile</button>
                        </Link>
                        {auth.isAuthenticated && auth.loading === false && 
                            auth.user._id === profile.user._id && 
                            (<Link to = '/edit-profile'>
                                <button className = "btn btn-light">Uredi profil</button>
                            </Link>)}
                    </div>
                    <div className = {`container ${styles.container}`}>
                        <div className = "row">
                            <About profile = { profile }></About>
                        </div>
                        <hr></hr>
                        <div className = "row">
                            <Social profile = { profile }></Social>
                        </div>
                        <div className = "row">
                            <Interests profile = { profile }></Interests>
                        </div>
                        <div className = "row">
                            <Bio profile = { profile }></Bio>
                        </div>
                        <div className="row">
                            <Events></Events>
                        </div>
                    </div>
                </Fragment>
            }</div>
        </div>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
