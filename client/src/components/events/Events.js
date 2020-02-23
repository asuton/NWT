import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import EventItem from "./EventItem";
import EventForm from "./EventForm";
import { getEvents } from "../../actions/event";
import styles from '../../styles/eventItem.module.css';

const Events = ({ getEvents, event: { events, loading } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const [displayCreateEvent, toggleCreateEvent] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className="container">
      <div className = {styles.create}>
        <h1 className='large text-primary' style = {{textAlign: "center"}}>Events</h1>
        <button
            onClick={() =>  toggleCreateEvent(!displayCreateEvent)}
            type="button"
            className="btn btn-primary"
          >
          Kreirajte novi događaj
        </button>
        <div className = "row">
          <div className="col-12 m-auto">
            {displayCreateEvent && <EventForm />}
          </div>
            <div style = {{width: '100%'}}>
              {events.map(event => (
                <EventItem key={event._id} event={event} />
              ))}
            </div></div></div>
    </div>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Events);
