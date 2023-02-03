import { API_URL } from "@/configs";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListRequest = () => ({
  type: PRODUCT_LIST_REQUEST,
});

export const productListSuccess = (data) => ({
  type: PRODUCT_LIST_SUCCESS,
  payload: data,
});

export const productListFail = (data) => ({
  type: PRODUCT_LIST_FAIL,
  payload: data,
});

const getProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest());

    const res = await fetch(`${API_URL}/api/v1/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(productListSuccess(data));
    return data;
  } catch (error) {
    dispatch(productListFail(error.message));
    throw error.message;
  }
};

export { getProducts };
