import { types } from "../types/types.js";

const initialState = { tasks: {} };

const AllTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VIEW_ALL_TASKS_REQUEST:
      return { tasks: {} };
    case types.VIEW_ALL_TASKS_SUCCESS:
      return { tasks: action.tasks };
    case types.VIEW_ALL_TASKS_FAILURE:
      return { tasks: {} };
    default:
      return state;
  }
};

export default AllTasksReducer;
