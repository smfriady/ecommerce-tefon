import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { productListReducer } from "./features/reducers/productReducers";
import { loginReducer, registerReducer } from "./features/reducers/authReducers";

/** Reducers */
const rootReducers = combineReducers({
  products: productListReducer,
  register: registerReducer,
  login: loginReducer,
});

const composeEnhancers = composeWithDevTools || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
