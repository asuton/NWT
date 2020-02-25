import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import EventItem from "./EventItem";
import CommentForm from "../event/CommentForm";
import CommentItem from "../event/CommentItem";
import { getEvent } from "../../actions/event";
import styles from "../../styles/comment.module.css";
import { addLike2, removeLike2, deleteEvent2 } from "../../actions/event";

const Event = ({
  getEvent,
  addLike2,
  removeLike2,
  event: { event, loading },
  match,
  deleteEvent2,
  auth,
  history
}) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className = "container">
        <div className = "row">
          <div className = "container">
            <div className = {styles.izbornik}>
              <div className = {styles.menu}>
                <Link to="/events">
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: "10px", marginBottom: "10px" }}
                  >
                    Natrag
                  </button>
                </Link>

                <div>
                  <button
                    onClick={() => addLike2(event._id)}
                    type="button"
                    className="btn btn-light"
                    style={{ marginRight: "10px", marginBottom: "10px" }}
                  >
                    <i className="fas fa-thumbs-up"></i>{' '}
                    <span>
                      {event.likes.length > 0 && <span>{event.likes.length}</span>}
                    </span>
                  </button>
                  <button
                    onClick={() => removeLike2(event._id)}
                    type="button"
                    className="btn btn-light"
                    style={{ marginRight: "10px", marginBottom: "10px" }}
                  >
                    <i className="fas fa-thumbs-down"></i>
                  </button>
                </div>
              </div>
              <div>
                {!auth.loading && event.user === auth.user._id && (
                            <button
                              onClick={() => deleteEvent2(event._id, history)}
                              type="button"
                              className="btn btn-danger"
                              style={{ marginRight: "10px", marginBottom: "10px" }}
                            >
                              <i className="fas fa-times" /><span>{' '}Izbriši</span>
                            </button>
                          )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${styles.eventContainer}`}>
        <EventItem event={event} showActions={true} />
      </div>

      <div className="container">
        {event.comments.sort((a, b) => (a.date > b.date) ? 1 : -1).map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            eventId={event._id}
          />
        ))}
      </div>

      <CommentForm eventId={event._id} />
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  addLike2: PropTypes.func.isRequired,
  removeLike2: PropTypes.func.isRequired,
  deleteEvent2: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, { getEvent, addLike2, removeLike2, deleteEvent2 })(
  withRouter(Event)
);
