import React, { Fragment } from 'react';
import styles from '../../styles/profileInfo.module.css';

const Bio = ({profile: { user, bio }}) => {
    return (
        <Fragment>
        {bio ?
        (<Fragment>
            <div className = "container">
                <label>O meni</label>
                <div className = {styles.social}>
                    {bio}
                </div>
                <hr></hr>
            </div>
        </Fragment>) : (null)}
    </Fragment>
    );
};

export default Bio
