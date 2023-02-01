import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { productListReducer } from "./features/reducers/productReducers";

/** Reducers */
const rootReducers = combineReducers({
  products: productListReducer,
});

const composeEnhancers = composeWithDevTools || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
