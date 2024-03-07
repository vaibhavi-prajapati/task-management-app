import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";
import rootReducer from "../redux/reducers/index";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export default store;
