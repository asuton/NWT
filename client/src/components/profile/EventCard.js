import React from 'react';
import { Link } from 'react-router-dom';
import Moment from "react-moment";

const EventCard = ({title, date, id}) => {
    
    return (
        <div className="card" style = {{marginBottom: "5px"}}>
            <div className="card-body">
                <div><Link to={`/events/${id}`}><h5>{title}</h5></Link></div>
                <p className = "lead"><Moment format="DD.MM.YYYY.">{date}</Moment></p>
            </div>
        </div>
    );
};

export default EventCard;