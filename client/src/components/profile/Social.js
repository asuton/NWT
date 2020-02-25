import React, { Fragment } from 'react'
import styles from '../../styles/profileInfo.module.css';

const Social = ({profile: { social }}) => {
    return (
        <Fragment>
            {social ?
            (<Fragment>
                <div className = "container">
                    <label>Društvene mreže</label>
                    <div className = {styles.social}>
                        {social.twitter && 
                            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className={`fab fa-twitter fa-2x ${styles.icon}`} style = {{color: "cornflowerblue"}}></i>
                            </a>}
                        {social.instagram && 
                                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                                    <i className={`fab fa-instagram fa-2x ${styles.icon} ${styles.instagram}`}></i>
                                </a>}
                        {social.facebook && 
                            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                                <i className={`fab fa-facebook fa-2x ${styles.icon}`} style = {{color: "darkblue"}}></i>
                            </a>}
                        {social.youtube && 
                            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                                <i className={`fab fa-youtube fa-2x ${styles.icon}`}style = {{color: "red"}}></i>
                            </a>}
                    </div>
                    <hr></hr>
                </div>
            </Fragment>) : (null)}
        </Fragment>
    );
};


export default Social