import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  FIND_ONE_PRODUCT_FAIL,
  FIND_ONE_PRODUCT_REQUEST,
  FIND_ONE_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS
} from "../constants/productConstants";

let initialState = {
  products: [],
  loading: false,
  error: "",
};

let initialProductState = {
  product: {},
  loading: false,
  error: "",
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};

export const singleProductReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case FIND_ONE_PRODUCT_REQUEST:
      return { loading: true };
    case FIND_ONE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case FIND_ONE_PRODUCT_FAIL:
      return { loading: false, product: {}, error: action.payload };
    default:
      return state;
  }
};


export const createProductReducer = (state = { product: {}, loading: false, error: "" }, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case ADD_PRODUCT_FAIL:
      return { loading: false, product: {}, error: action.payload };
    default:
      return state;
  }
};
