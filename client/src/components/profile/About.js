import React from 'react';
import styles from '../../styles/profileInfo.module.css';
import Slika from '../../images/preuzmi.png';

const About = ({profile: {user, location, age, image}}) => {
    let today = new Date().toISOString().slice(0, 4);
    const godine = Number(today) - Number(age.slice(0, 4));
    return (
        <div className = {`container ${styles.wrapper}`}>
            <div>
                <h2>{user.name}</h2>
                <div>
                    <p className="lead" style={{marginBottom: "2px", wordBreak: "break-word"}}>Lokacija: {location}</p>
                </div>
                <p className="lead" style={{marginBottom: "2px", wordBreak: "break-word"}}>Godine: {godine}</p>
            </div>
            {image ? (<img src={image} alt="" className={`${styles.avatar} rounded-circle img-fluid`}/>) : 
                //<img src={Slika} alt="" className={`${styles.avatar} rounded-circle img-fluid`}/>
                (<p></p>)
            }
        </div>
    );
};

export default About;