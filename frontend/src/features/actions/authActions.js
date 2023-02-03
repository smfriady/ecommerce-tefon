import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/authConstants";

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

export { customerRegister };
