import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/navbar.module.css';

const Navbar = () => {
    return(
        <nav className = {`navbar navbar-expand-lg navbar-light bg-light fixed-top py-0 pl-2 ${styles.navbar}`}>
            <div className = "container">
            <Link className =  {`${styles.link} ${styles.font}`} to = '/'><div className = {styles.button}>Event App</div></Link>
                <button className = "navbar-toggler" type = "button" data-toggle = "collapse" data-target = "#navbarNavAltMarkup" aria-controls = "navbarNavAltMarkup" aria-expanded = "false" aria-label = "Toggle navigation">
                    <span className = "navbar-toggler-icon"></span>
                </button>
            <div className = "collapse navbar-collapse" id = "navbarNavAltMarkup">
                <div className = "navbar-nav ml-auto"> 
                    <Link className =  {styles.link} to = '/register'><div className = {styles.button}>Registracija</div></Link>
                </div>
            </div>
        </div>
    </nav>

    )
}

export default Navbar