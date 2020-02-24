import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EVENTS,
  EVENT_ERROR,
  UPDATE_LIKES,
  UPDATE_LIKES2,
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_EVENT,
  DELETE_EVENT2
} from "./types";

// Get events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events");

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
    dispatch({ type: CLEAR_EVENT });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ADD LIKE
//saljemo id od eventa da se zna koji se event likea
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
      // objekt s event id-em, likes su objekt koji se vraca tj polje lajkova
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like 2
export const addLike2 = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/like/${id}`);

    dispatch({
      type: UPDATE_LIKES2,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Remove like 2
export const removeLike2 = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES2,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete event
export const deleteEvent = id => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });

    dispatch(setAlert("Event removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEvent2 = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT2,
      payload: id
    });

    dispatch(setAlert("Event removed", "success"));
    history.push('/events');
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event
export const addEvent = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/events", formData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert("Event created", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get event
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (eventId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/events/comment/${eventId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (eventId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/events/comment/${eventId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
