import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/event";
import styles from "../../styles/comment.module.css";

const CommentItem = ({
  eventId,
  comment: { _id, text, name, user, date },
  auth,
  deleteComment
}) => (
  <div className={`container ${styles.commentItem}`}>
    <div className={styles.userX}>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(eventId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
    <div>
      <p className={styles.text}>{text}</p>
      <small className={styles.date}>
        Komentirano <Moment format="DD. MM. YYYY.">{date}</Moment>
      </small>
    </div>
  </div>
);

CommentItem.propTypes = {
  eventId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
