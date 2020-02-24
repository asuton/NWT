import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light" style = {{marginRight: "3px"}}>
        <i className="fas fa-user-circle text-primary" /> Uredi profil
      </Link>
      <Link to="/edit-profile-picture" className="btn btn-light" style = {{marginLeft: "3px"}}>
        <i className="fa fa-picture-o" aria-hidden="true" style={{color: 'rgb(0, 123, 255)'}}></i>{' '}Uredi sliku profila
      </Link> 
    </div>
  );
};

export default DashboardActions;
