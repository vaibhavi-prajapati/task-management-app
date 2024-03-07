import { combineReducers } from "redux";
import AddTaskReducer from "./addTaskReducer.js";
import AllTasksReducer from "./allTasksReducer.js";

const rootReducer = combineReducers({
  AddTaskReducer,
  AllTasksReducer,
});

export default rootReducer;
