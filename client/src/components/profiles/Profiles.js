import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';
import styles from '../../styles/profiles.module.css'

const Profiles = ({ getProfiles, profile: { profiles, loading, loaded } }) => {
    useEffect(() => {
      getProfiles();
    }, [getProfiles]);
    
    const [Search, setSearch] = useState({
        search: ''
    });
    
    const { search } = Search;
    
    let filteredProfiles = profiles.filter(profile => profile.user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    const updateSearch = e => {
        setSearch({ 
          ...Search, 
          search: e.target.value.substr(0, 30) 
        });
    };    


    if (loading) return <Spinner/>;
    //if (!loaded || !profiles ) return <Spinner/>;
    return (
            <div className = "container">
                <div style = {{width: "100%"}}>
                    <h1 className='large text-primary' style = {{textAlign: "center"}}>Korisnici</h1>
                    <div className = {styles.wrapper}>
                        <input className = {styles.search} type="text" placeholder="Pretraži korisnike" value={search} onChange={e => updateSearch(e)}></input> 
                    </div>
                </div>
                <div>
                    {profiles.length > 0 ? (
                    filteredProfiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                    ) : (
                    <h4 style = {{textAlign: "center"}}>Nema registriranih korisnika</h4>
                    )}
                </div>
            </div> 
      );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
