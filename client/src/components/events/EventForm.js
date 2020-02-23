import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent } from "../../actions/event";
import styles from "../../styles/createEvent.module.css";

const EventForm = ({ addEvent }) => {
  const [eventData, setEventData] = useState({
    text: '',
    title: '',
    location: '',
    eventDate: '',
    category: '',
    eventImg: ''
  });

  const {
    text,
    title,
    location,
    eventDate,
    category
  } = eventData;

  const onChange = e => setEventData({ ...eventData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    switch(category){
      case "Zabava":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481035/events/zabava_atrd8u.jpg";
        break;
      case "Kultura":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481005/events/kultura_msdfhy.jpg";
        break;
      case "Sport":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481113/events/sport_zvo8pr.jpg";
        break;
      case "Obrazovanje":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481005/events/obrazovanje_b3ufy9.png";
        break;
      case "Glazba":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481026/events/glazba_tty168.jpg";
        break;
      case "Film":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481607/events/film_bqrmv7.jpg";
        break;
      case "Ostalo":
        eventData.eventImg = "https://res.cloudinary.com/dggse3lsx/image/upload/v1582481272/events/ostalo_nnd3sm.jpg";
        break;
      default:
        eventData.eventImg = "";
    }

    addEvent(eventData);
  };

  return (
    <Fragment>
      <div className={`container ${styles.container}`}>
        <small>* obavezno ispuniti</small>
        <br></br>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="InputEventDate">Vrijeme događaja *</label>
            <input
              type="datetime-local"
              className="form-control"
              name="eventDate"
              value={eventDate}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputLocation">Lokacija događaja *</label>
            <input
              type="text"
              placeholder="Mjesto"
              className="form-control"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div class="form-group">
            <label hmtlFor="InputCategory">Kategorija *</label>
            <select class="form-control" 
              name="category"
              value={category}
              onChange={e => onChange(e)}
              >
                <option>Zabava</option>
                <option>Kultura</option>
                <option>Sport</option>
                <option>Obrazovanje</option>
                <option>Film</option>
                <option>Glazba</option>
                <option>Ostalo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="InputTitle">
              Naziv događaja *
            </label>
            <input
              type="text"
              placeholder="Naziv"
              className="form-control"
              name="title"
              value={title}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputBio">O događaju *</label>
            <textarea
              placeholder="O događaju"
              className="form-control"
              name="text"
              value={text}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Pošalji</button>
        </form>
      </div>
    </Fragment>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired
};

export default connect(null, { addEvent })(EventForm);
