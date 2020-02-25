import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
// importamo connect jer ima puno akcija (add like, remove like, delete event)
//import Slika from "../../images/preuzmi.png";
import { getProfiles } from "../../actions/profile";
import styles from "../../styles/eventItem.module.css";
import Spinner from "../layout/Spinner";

const EventItem = ({
  profile: { profiles, loading },
  getProfiles,
  event: {
    _id,
    text,
    name,
    user,
    likes,
    eventDate,
    location,
    category,
    eventImg,
    profileImg,
    date,
    title
  }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  let filteredGoingPeople = profiles.filter(osoba => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].user === osoba.user._id) return true;
    }
  });
  return loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <div className={`${styles.cardRow} row m-auto`}>
        <div className="col-12 m-1">
          <div className={`card ${styles.card}`}>
            <div
              className="card-header d-flex align-items-center"
              style={{ backgroundColor: "rgba(148, 148, 148, 0.05)" }}
            >
              <figure className="mb-0 mr-2" style={{ maxWidth: "75px" }}>
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt=""
                    style={{ height: "75px", width: "75px" }}
                    className="mx-auto rounded-circle img-fluid"
                  />
                ) : (
                  <p></p>
                  // <img
                  //   src={Slika}
                  //   alt=""
                  //   style={{ height: "75px", width: "75px" }}
                  //   className="mx-auto rounded-circle img-fluid"
                  // />
                )}
              </figure>
              <div>
                <Link to={`/profile/${user}`}>
                  <h5 className="mb-0">{name}</h5>
                </Link>
                <p className="mb-0">
                  Objavljeno:{" "}
                  <span style={{ display: "inline-block" }}>
                    <Moment format="HH:mm DD.MM.YYYY.">{date}</Moment>
                  </span>
                </p>
              </div>
            </div>
            <div
              className="mb-0"
              style={{ position: "relative", overflow: "hidden" }}
            >
              {eventImg ? (
                <img
                  className={`card-img ${styles.image}`}
                  alt=""
                  src={eventImg}
                />
              ) : (
                <p></p>
                // <img
                //   className={`card-img ${styles.image}`}
                //   alt=""
                //   src={profileImg}
                // />
              )}
            </div>
            <div className={`card-body ${styles.cardBody}`}>
              <Link to={`/events/${_id}`}>
                <h4>{title}</h4>
              </Link>
              <p className="card-text" style={{ whiteSpace: "break-spaces" }}>
                {text}
              </p>
              <hr></hr>
              <p className="lead">{category}</p>
              <p>Mjesto: {location}</p>
              <p>
                Vrijeme: <Moment format="HH:mm DD.MM.YYYY.">{eventDate}</Moment>
              </p>
            </div>
            <div
              className={`card-footer ${styles.footer}`}
              style={{ backgroundColor: "rgba(148, 148, 148, 0.05)" }}
            >
              <div>
                <p className="lead">Idu: </p>
                <div className={styles.going}>
                  {filteredGoingPeople.length > 0 ? (
                    filteredGoingPeople.map(person => (
                      <Link to={`/profile/${person.user._id}`}>
                        <p style={{ marginRight: "7px" }}>{person.user.name}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="lead">Još nitko ne ide na događaj</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EventItem.defaultProps = {
  showActions: true
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

// auth state kako bi se delete button prikazao samo onom korisniku ciji je to event
export default connect(mapStateToProps, { getProfiles })(EventItem);
