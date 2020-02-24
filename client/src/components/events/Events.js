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
  
  const [Sort, setSort] = useState({
    filter: '1'
  });

  //
  //  KASNIJE NAME U TITLEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //
  const { filter } = Sort;

  let filteredEvents = events.filter(event => event.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  const updateSearch = e => {
      setSearch({ 
        ...Search, 
        search: e.target.value.substr(0, 30) 
      });
  };    

  const handleClick = (order) => {
    if(order === '1')
      setSort({
        filter: '1'
      })
    else 
      setSort({
        filter: '0'
      })
  }  

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
            style = {{marginBottom: "10px", width: '225px'}}
          >
          Kreirajte novi događaj
        </button>
        <div className = "row" style = {{width: "100%"}}>
          <div className="col-12 m-auto">
            {displayCreateEvent && <EventForm />}
          </div>
          <div className="col-12 m-auto">
            <div className = {styles.button}>
              <button
                onClick={() =>  toggleSearchEvent(!displaySearchEvent)}
                type="button"
                className="btn btn-primary"
                style = {{marginBottom: "10px", width: '225px'}}
              >
              Pretražite događaje
              </button>
            </div>
            {displaySearchEvent &&  
              <div className={styles.wrapper}>
                <input className={styles.search} type="text" placeholder="Pretraži događaje" value={search} onChange={e => updateSearch(e)}></input> 
                <div className="dropdown" style = {{borderRadius: '0.25rem'}}>
                  <button className={`btn btn-outline-secondary btn-lg dropdown-toggle`} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sortiraj
                  </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                  <button className="dropdown-item" onClick={() => handleClick('1')} type="button">Sortiraj po datumu objave</button>
                  <button className="dropdown-item" onClick={() => handleClick('0')} type="button">Sortiraj po datumu događaja</button>
                </div>
                </div>
              </div>}
          </div>
          <div style = {{width: '100%'}}>
            {filter === '1' ? 
              (filteredEvents.sort((a, b) => (a.date > b.date) ? -1 : 1).map(event => (<EventItem key={event._id} event={event} />))) 
              : (filteredEvents.sort((a, b) =>  (a.eventDate > b.eventDate) ? 1 : -1).map(event => (<EventItem key={event._id} event={event} />)))}
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
