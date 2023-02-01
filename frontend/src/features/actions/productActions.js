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

const baseUrl = "http://localhost:3001";

const getProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest());

    const data = [];
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFail(error));
  }
};

export { getProducts };
