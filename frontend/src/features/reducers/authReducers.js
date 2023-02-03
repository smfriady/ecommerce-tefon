import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/authConstants";

let initialState = {
  register: {},
  loading: false,
  error: "",
};

let initialLoginState = {
  login: {},
  loading: false,
  error: "",
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, register: action.payload, error: "" };
    case REGISTER_FAIL:
      return { loading: false, register: {}, error: action.payload };
    default:
      return state;
  }
};

export const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, login: action.payload, error: "" };
    case LOGIN_FAIL:
      return { loading: false, login: {}, error: action.payload };
    default:
      return state;
  }
};
