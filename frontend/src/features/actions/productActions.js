import { API_URL } from "@/configs";
import {
  FIND_ONE_PRODUCT_FAIL,
  FIND_ONE_PRODUCT_REQUEST,
  FIND_ONE_PRODUCT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
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

export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = (data) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: data,
});

export const addProductFail = (data) => ({
  type: ADD_PRODUCT_FAIL,
  payload: data,
});

export const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const deleteProductSuccess = (data) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: data,
});

export const deleteProductFail = (data) => ({
  type: DELETE_PRODUCT_FAIL,
  payload: data,
});

export const editProductRequest = () => ({
  type: EDIT_PRODUCT_REQUEST,
});

export const editProductSuccess = (data) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: data,
});

export const editProductFail = (data) => ({
  type: EDIT_PRODUCT_FAIL,
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

const addProduct = (payload) => async (dispatch) => {
  try {
    dispatch(addProductRequest());

    const res = await fetch(`${API_URL}/api/v1/products`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(addProductSuccess(data));
    dispatch(getProducts());
    return data;
  } catch (error) {
    dispatch(addProductFail(error.message));
    throw error.message;
  }
};

const deleteProduct = (payload) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const res = await fetch(`${API_URL}/api/v1/products/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(deleteProductSuccess(data));
    dispatch(getProducts());
    return data;
  } catch (error) {
    dispatch(deleteProductFail(error.message));
    throw error.message;
  }
};

const editProduct = (payload) => async (dispatch) => {
  try {
    dispatch(editProductRequest());

    const res = await fetch(`${API_URL}/api/v1/products/${payload.id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch(editProductSuccess(data));
    dispatch(getProducts());
    return data;
  } catch (error) {
    dispatch(editProductFail(error.message));
    throw error.message;
  }
};

export { getProducts, getProduct, addProduct, deleteProduct, editProduct };
