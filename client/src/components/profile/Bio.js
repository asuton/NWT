import React, { Fragment } from 'react';
import styles from '../../styles/profileInfo.module.css';

const Bio = ({profile: { bio }}) => {
    return (
        <Fragment>
        {bio ?
        (<Fragment>
            <div className = "container">
                <label>O meni</label>
                <div className = {styles.social} style = {{whiteSpace: "break-spaces"}}>
                    {bio}
                </div>
                <hr></hr>
            </div>
        </Fragment>) : (null)}
    </Fragment>
    );
};

export default Bio