import React from 'react';
import styles from '../../styles/profileInfo.module.css';
import EventCard from './EventCard';
import EventGoingCard from './EventGoingCard';

const Events = ({profile, events}) => {
    let filteredUserEvents = events.filter(event => event.user === profile.user._id);
    let filteredGoingEvents = events.filter(event => {
        for(let i = 0; i < event.likes.length; i++){
            if(event.likes[i].user === profile.user._id) return true;
        }
    });
    return (
        <div className="col-12">
            <label>Događaji</label>
            <div className="card mt-3 tab-card" style = {{border: "none"}}>
                <div className="card-header tab-card-header m-0 p-0" style = {{backgroundColor: "white"}}>
                    <ul className="nav nav-tabs card-header-tabs m-0" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="one-tab" data-toggle="tab" href="#one" aria-selected="true">Moji</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" aria-selected="false">Idem</a>
                        </li>
                    </ul>
                </div>
                <div className={`tab-content ${styles.eventCard}`} id="myTabContent">
                    <div className="tab-pane fade show active p-3" id="one">
                        {filteredUserEvents.length > 0 ? (filteredUserEvents.sort((a, b) => (a.eventDate > b.eventDate) ? -1 : 1).map(event => (
                            <EventCard 
                                title = {event.title} 
                                date = {event.eventDate} 
                                id = {event._id} 
                                key = {event._id}>
                            </EventCard>
                        ))) : (<p className = "lead">Korisnik nema vlastitih događaja</p>)}           
                    </div>
                    <div className="tab-pane fade p-3" id="two">
                        {filteredGoingEvents.length > 0 ? (filteredGoingEvents.sort((a, b) => (a.eventDate > b.eventDate) ? -1 : 1).map(event => (
                            <EventGoingCard 
                                title = {event.title} 
                                date = {event.eventDate} 
                                id = {event._id} 
                                name = {event.name} 
                                user = {event.user}
                                key = {event._id}>
                            </EventGoingCard>
                        ))) : (<p className = "lead">Korisnik ne ide na događaje</p>)}          
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;