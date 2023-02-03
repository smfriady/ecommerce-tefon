import { NEXT_URL } from "@/configs";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/authConstants";

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFail = (data) => ({
  type: REGISTER_FAIL,
  payload: data,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = (data) => ({
  type: LOGIN_FAIL,
  payload: data,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (data) => ({
  type: LOGOUT_SUCCESS,
  payload: data,
});

export const logoutFail = (data) => ({
  type: LOGOUT_FAIL,
  payload: data,
});

const baseUrl = "http://localhost:3001/api/v1";

const customerRegister = (credential) => async (dispatch, _getState) => {
  try {
    dispatch(registerRequest());

    const res = await fetch(`${baseUrl}/customers/register`, {
      method: "POST",
      body: JSON.stringify(credential),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(registerSuccess(data));
    return data;
  } catch (error) {
    dispatch(registerFail(error.message));
    throw error.message;
  }
};

const customerLogin = (credential) => async (dispatch, _getState) => {
  try {
    dispatch(loginRequest());

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(credential),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(loginSuccess(data));
    return data;
  } catch (error) {
    dispatch(loginFail(error.message));
    throw error.message;
  }
};

const customerLogout = () => async (dispatch, _getState) => {
  try {
    dispatch(logoutRequest());

    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(logoutSuccess(data));
    return data;
  } catch (error) {
    dispatch(logoutFail(error.message));
    throw error.message;
  }
};

export { customerRegister, customerLogin, customerLogout };
