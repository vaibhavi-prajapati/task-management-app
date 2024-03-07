import { types } from "../types/types.js";

const initialState = { task: {} };

const AddTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TASK_REQUEST:
      return { task: {} };
    case types.ADD_TASK_SUCCESS:
      return { task: action.task };
    case types.ADD_TASK_FAILURE:
      return { task: {} };
    default:
      return state;
  }
};

export default AddTaskReducer;
