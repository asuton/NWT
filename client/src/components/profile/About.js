import React from 'react';
import styles from '../../styles/profileInfo.module.css';
import Slika from '../../images/preuzmi.png';

const About = ({profile: {user, location, age}}) => {
    const godine = Number(2020) - Number(age.substring(0,4));
    return (
        <div className = {`container ${styles.wrapper}`}>
            <div>
                <h2>{user.name}</h2>
                <div>
                    <p className="lead" style={{marginBottom: "2px"}}>Lokacija: {location}</p>
                </div>
                <p className="lead" style={{marginBottom: "2px"}}>Godine: {godine}</p>
            </div>
            <img src={Slika} alt="" className={`rounded-circle img-fluid ${styles.avatar}`}/>
        </div>
    );
};

export default About;
