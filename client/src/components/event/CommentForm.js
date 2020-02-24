import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/event";
import styles from "../../styles/comment.module.css";

const CommentForm = ({ eventId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div className={`container ${styles.formContainer}`}>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addComment(eventId, { text });
          setText("");
        }}
      >
        <div className="form-group">
          <textarea
            placeholder="Komentirajte..."
            className="form-control"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Komentiraj
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
