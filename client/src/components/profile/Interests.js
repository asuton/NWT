import React, { Fragment } from 'react';
import styles from '../../styles/profileInfo.module.css';

const Interests = ({profile: { interests }}) => {
    return (
        <Fragment>
            {interests.length !== 0 ?
            (<Fragment>
                <div className = "container">
                    <label>Interesi</label>
                    <div className = {styles.social}>
                        {interests.map((interest, index) => (
                            <p style = {{marginRight: "5px", marginLeft: "5px"}} key = {index}>{interest}</p>
                        ))}
                    </div>
                    <hr></hr>
                </div>
            </Fragment>) : (null)}
        </Fragment>
    );
};

export default Interests;