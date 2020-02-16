import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className = "navbar navbar-expand-lg navbar-light bg-light py-3 pl-2">
            <div><Link to = '/'>Event App</Link></div>
            <button className = "navbar-toggler" type = "button" data-toggle = "collapse" data-target = "#navbarNavAltMarkup" aria-controls = "navbarNavAltMarkup" aria-expanded = "false" aria-label = "Toggle navigation">
                <span className = "navbar-toggler-icon"></span>
            </button>
        <div className = "collapse navbar-collapse" id = "navbarNavAltMarkup">
            <div className = "navbar-nav ml-auto"> 
            <div><Link to = '/register'>Registracija</Link></div>
        </div>
      </div>
    </nav>

    )
}

export default Navbar