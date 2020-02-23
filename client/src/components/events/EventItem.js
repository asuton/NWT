import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
// importamo connect jer ima puno akcija (add like, remove like, delete event)
import Slika from "../../images/preuzmi.png";
import { addLike, removeLike, deleteEvent } from "../../actions/event";

const EventItem = ({
  addLike,
  removeLike,
  deleteEvent,
  auth,
  event: { 
    _id, 
    text, 
    name, 
    user, 
    likes, 
    comments, 
    eventDate, 
    location,
    category,
    eventImg,
    profileImg,
    date,
    title
  }
}) => (
  // <div className="post bg-white p-1 my-1">
  //   <div>
  //     <Link to={`/profile/${user}`}>
  //       {profileImg ? (
  //         <img
  //           src={profileImg}
  //           alt=""
  //           style={{ height: '200px', width: '200px' }}
  //           className="mx-auto rounded-circle img-fluid"
  //         />
  //       ) : (
  //       <img
  //         src={Slika}
  //         alt=""
  //         style={{ height: '200px', width: '200px' }}
  //         className="mx-auto rounded-circle img-fluid"
  //       />
  //       )}
  //       <h4>{name}</h4>
  //     </Link>
  //   </div>
  //   <div>
  //     <p className="my-1">{text}</p>
  //     <p className="post-date">Mjesto: {location}</p>
  //     <p className="post-date">
  //       Datum: <Moment format="DD.MM.YYYY.">{date}</Moment>
  //     </p>

  //     <button
  //       onClick={() => addLike(_id)}
  //       type="button"
  //       className="btn btn-light"
  //     >
  //       <i className="fas fa-thumbs-up"></i>
  //       <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
  //     </button>
  //     <button
  //       onClick={() => removeLike(_id)}
  //       type="button"
  //       className="btn btn-light"
  //     >
  //       <i className="fas fa-thumbs-down"></i>
  //     </button>
  //     <Link to={`/events/${_id}`} className="btn btn-primary">
  //       Komentari
  //       {comments.length > 0 && (
  //         <span className="comment-count">{comments.length}</span>
  //       )}
  //     </Link>
  //     {!auth.loading && user === auth.user._id && (
  //       <button
  //         onClick={() => deleteEvent(_id)}
  //         type="button"
  //         className="btn btn-danger"
  //       >
  //         <i className="fas fa-times" />
  //       </button>
  //     )}
  //   </div>
  // </div>
  <div className="card shadow-sm m-auto" style={{width:"700px"}}>
    <div className="card-header bg-white d-flex align-items-center flex-wrap">
      <figure className="mb-0 mr-2" style={{maxWidth:"75px"}}>
      {profileImg ? (
        <img
          src={profileImg}
          alt=""
          style={{ height: '75px', width: '75px' }}
          className="mx-auto rounded-circle img-fluid"
        />
      ) : (
        <img
          src={Slika}
          alt=""
          style={{ height: '75px', width: '75px' }}
          className="mx-auto rounded-circle img-fluid"
        />
      )}
      </figure>
      <div>
        <Link to={`/profile/${user}`}><h5 className="mb-0">{name}</h5></Link>
        <p className="mb-0">Objavljeno: <Moment format="DD.MM.YYYY.">{date}</Moment></p>
      </div>
    </div>
    <figure className="mb-0" style={{position:"relative"}}>
      <img className="card-img" alt= '' src={profileImg} style={{ height: '250px', width: '100%' }}/>
    </figure>
    <div className="card-body">
      <p className="card-text">{text}</p>
      <p className="post-date">Mjesto: {location}</p>
      <p className="post-date">
         Datum: <Moment format="DD.MM.YYYY.">{eventDate ? (eventDate) : (date)}</Moment>
       </p>
    </div>
    <div className="card-footer" >
    <button
         onClick={() => addLike(_id)}
         type="button"
         className="btn btn-light"
       >
         <i className="fas fa-thumbs-up"></i>
         <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
       </button>
       <button
         onClick={() => removeLike(_id)}
         type="button"
         className="btn btn-light"
       >
         <i className="fas fa-thumbs-down"></i>
       </button>
       <Link to={`/events/${_id}`} className="btn btn-primary">
         Komentari
         {comments.length > 0 && (
           <span className="comment-count">{comments.length}</span>
         )}
       </Link>
       {!auth.loading && user === auth.user._id && (
         <button
           onClick={() => deleteEvent(_id)}
           type="button"
           className="btn btn-danger"
         >
           <i className="fas fa-times" />
         </button>
       )}
    </div>
  </div>
);

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// auth state kako bi se delete button prikazao samo onom korisniku ciji je to event
export default connect(mapStateToProps, { addLike, removeLike, deleteEvent })(
  EventItem
);
