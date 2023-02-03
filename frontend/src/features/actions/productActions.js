import { API_URL } from "@/configs";
import {
  FIND_ONE_PRODUCT_FAIL,
  FIND_ONE_PRODUCT_REQUEST,
  FIND_ONE_PRODUCT_SUCCESS,
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

export const findOneProductRequest = () => ({
  type: FIND_ONE_PRODUCT_REQUEST,
});

export const findOneProductSuccess = (data) => ({
  type: FIND_ONE_PRODUCT_SUCCESS,
  payload: data,
});

export const findOneProductFail = (data) => ({
  type: FIND_ONE_PRODUCT_FAIL,
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

const getProduct = (slug) => async (dispatch) => {
  try {
    dispatch(findOneProductRequest());

    const res = await fetch(`${API_URL}/api/v1/products/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(findOneProductSuccess(data));
    return data;
  } catch (error) {
    dispatch(findOneProductFail(error.message));
    throw error.message;
  }
};

export { getProducts, getProduct };
