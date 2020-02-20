import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import styles from '../../styles/profile.module.css';
import Social from './Social';
import Slika from '../../images/preuzmi.png';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <div className = "container">
            <div class="row">
            { profile === null || loading ? <Spinner></Spinner> : 
                <div className = "container">
                    <div className = {styles.wrapper}>
                        <div>
                            <h2 style = {{marginBottom: "20px", marginTop: "20px"}}>{profile.user.name}</h2>
                            <Link to = '/profiles'>
                                <button className = "btn btn-primary" style = {{marginRight: "10px"}}>Natrag na profile</button>
                            </Link>
                            {auth.isAuthenticated && auth.loading === false && 
                                auth.user._id === profile.user._id && 
                                (<Link to = '/edit-profile'>
                                    <button className = "btn btn-light">Uredi profil</button>
                                </Link>)}
                        </div>
                        <div>
                            <img src={Slika} alt="" style = {{maxWidth: "150px"}} className="mx-auto rounded-circle img-fluid"/>
                        </div>
                    </div>
                    <hr></hr>
                    <div class = "row">
                    <Social profile = {profile}></Social>
                    <div className = "col-lg-9 col-md-8 col-sm-12">
                        bio
                        </div>
                    </div>
                    <div className = "container">
                            
                    </div>
                </div>
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
