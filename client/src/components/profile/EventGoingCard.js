import React from 'react';
import { Link } from 'react-router-dom';
import Moment from "react-moment";

const EventGoingCard = ({title, date, id, name, user}) => {
    
    return (
        <div className="card" style = {{marginBottom: "5px"}}>
            <div className="card-body">
                <div><Link to={`/events/${id}`}><h5>{title ? (title) : ('Događaj')}</h5></Link></div>
                <p className = "lead" style = {{marginBottom: '3px'}}>
                    Organizira: <Link to={`/profile/${user}`}>{name}</Link>
                </p>
                <p className = "lead"><Moment format="DD.MM.YYYY.">{date}</Moment></p>
            </div>
        </div>
    );
};

export default EventGoingCard;