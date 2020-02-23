import {
  GET_EVENTS,
  EVENT_ERROR,
  UPDATE_LIKES,
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../actions/types";

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        // u prikazu prvo payload tj novi event zatim stari eventovi iz ..state.events
        events: [payload, ...state.events],
        loading: false
      };
    case DELETE_EVENT:
      return {
        ...state,
        // pomocu filtera vracamo sve eventove osim izbrisanog
        events: state.events.filter(event => event._id !== payload),
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === payload.id ? { ...event, likes: payload.likes } : event
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        event: { ...state.event, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        event: {
          ...state.event,
          comments: state.event.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
