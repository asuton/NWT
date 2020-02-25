import axios from "axios";

// ako postoji token doda ga u header, a ako ga nema izbrise ga iz headera
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;