import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, GET_PROFILE_SUCCESS, GET_PROFILES_SUCCESS, UPDATE_PROFILE } from "../actions/types";

const initialState = {
  // profile kad smo logirani radi sve zahtjeve,
  //dohvaca podatke profila i stavlja tu
  //takoder ako posjecujemo tudi profil "it will get put in there"
  profile: null,
  // profiles za stranicu koja izlistava sve profile
  profiles: [],
  loading: false,
  //loaded: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        //loading: false
      };
    case GET_PROFILES_SUCCESS:
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        //loaded: true
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: true,
        //loaded: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        //loaded: false
        //profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
