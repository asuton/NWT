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
  const [displaySearchEvent, toggleSearchEvent] = useState(false);

  const [Search, setSearch] = useState({
    search: ''
  });

  const { search } = Search;

  //
  //  KASNIJE NAME U TITLEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //

  let filteredEvents = events.filter(event => event.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  const updateSearch = e => {
      setSearch({ 
        ...Search, 
        search: e.target.value.substr(0, 30) 
      });
  };    

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
            style = {{marginBottom: "10px"}}
          >
          Kreirajte novi događaj
        </button>
        <div className = "row">
          <div className="col-12 m-auto">
            {displayCreateEvent && <EventForm />}
          </div>
          <div className="col-12 m-auto">
            <div className = {styles.button}>
              <button
                onClick={() =>  toggleSearchEvent(!displaySearchEvent)}
                type="button"
                className="btn btn-primary"
                style = {{marginBottom: "10px"}}
              >
              Pretražite događaje
              </button>
            </div>
            {displaySearchEvent &&  
              <div className={styles.wrapper}>
                <input className={styles.search} type="text" placeholder="Pretraži događaje" value={search} onChange={e => updateSearch(e)}></input> 
              </div>}
          </div>
            <div style = {{width: '100%'}}>
              {filteredEvents.map(event => (
                <EventItem key={event._id} event={event} />
              ))}
            </div>
          </div>
        </div>
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

export default connect( mapStateToProps, { getEvents })(Events);
