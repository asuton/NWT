import React, { Fragment } from 'react'
import styles from '../../styles/social.module.css';

const Social = ({profile: {user, social}}) => {
    return (
        <div className = "col-lg-3 col-md-4 col-sm-12">
            {social ?
            (<div className = {styles.social}>
                {social.twitter && 
                    <div className = {styles.iconContainer}>
                        <i className={`fab fa-twitter fa-2x ${styles.icon}`} style = {{color: "cornflowerblue"}}></i>
                        <p style={{margin: "0px"}}>{social.twitter}</p>
                    </div>}
                {social.instagram && 
                    <div className = {styles.iconContainer}>
                        <i className={`fab fa-instagram fa-2x ${styles.icon} ${styles.instagram}`}></i>
                        <p style={{margin: "0px"}}>{social.instagram}</p>
                    </div>}
                {social.facebook && 
                    <div className = {styles.iconContainer}>
                        <i className={`fab fa-facebook fa-2x ${styles.icon}`} style = {{color: "darkblue"}}></i>
                        <p style={{margin: "0px"}}>{social.facebook}</p>
                    </div>}
                {social.youtube && 
                    <div className = {styles.iconContainer}>
                        <i className={`fab fa-youtube fa-2x ${styles.icon}`}style = {{color: "red"}}></i>
                        <p style={{margin: "0px"}}>{social.youtube}</p>
                    </div>}
            </div>) : (<p>{user.name} nema unesenih društvenih mreža</p>)}
        </div>
    )
}


export default Social
