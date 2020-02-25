import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getEvents} from '../../actions/event';
import EventCard from '../profile/EventCard';
import EventGoingCard from '../profile/EventGoingCard';

const DashboardEvents = ({ getEvents, auth, event: {events} }) => {
    useEffect(() => {
        getEvents();
    }, [getEvents]);
    let today = new Date().toISOString().slice(0, 10);

    let filteredUserEvents = events.filter(event => event.user === auth.user._id && event.eventDate.slice(0,10) === today)

    let filteredGoingEvents = events.filter(event => {
        if(event.eventDate.slice(0,10) === today){
            for(let i = 0; i < event.likes.length; i++){
                if(event.likes[i].user === auth.user._id) return true;
                else return false;
            }
        }
        else return false;
    });

    return ( !events.loading ? 
        (<div className = "container">
            <div className = "row">
                { events.loading || events === null ? <Spinner></Spinner> :
                    <div className = "col-lg-5 col-md-5 col-sm-10">
                        <h5 style = {{textAlign: "center"}}>Danas održavate: </h5>
                        {filteredUserEvents.length > 0 ? (filteredUserEvents.map(event => (
                            <EventCard title = {event.title} date = {event.eventDate} id = {event._id} key = {event._id}></EventCard>
                        ))):(<p className = "lead" style = {{textAlign: "center"}}>Danas ne održavate događaje</p>)}
                    </div>
                }
                <div className ="col-lg-2 col-md-2 col-sm-0"></div> 
                { events.loading || events === null ? <Spinner></Spinner> :
                     <div className ="col-lg-5 col-md-5 col-sm-10">
                        <h5 style = {{textAlign: "center"}}>Danas idete na: </h5>
                        {filteredGoingEvents.length > 0 ? (filteredGoingEvents.map(event => (
                            <EventGoingCard 
                                title = {event.title} 
                                date = {event.date} 
                                id = {event._id} 
                                name = {event.name} 
                                user = {event.user}
                                key = {event._id}
                            >
                            </EventGoingCard>
                        ))):(<p className = "lead" style = {{textAlign: "center"}}>Danas ne idete na događaje</p>)}
                    </div>
                }
            </div>
        </div>
    ) : (<Spinner></Spinner>))
}

DashboardEvents.propTypes = {
    auth: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    event: state.event
})

export default connect(mapStateToProps, { getEvents })(DashboardEvents);
