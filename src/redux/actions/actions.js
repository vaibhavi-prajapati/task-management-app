import { addTask, updateTaskOrder, viewTasks } from "../services/services.js";
import { types } from "../types/types.js";

export const addTaskAction = (task) => {
  return (dispatch) => {
    dispatch(request(task));
    task.id = Date.now();
    addTask(task);
    dispatch(success(task));
  };
  function request(task) {
    return { type: types.ADD_TASK_REQUEST, task };
  }
  function success(task) {
    return { type: types.ADD_TASK_SUCCESS, task };
  }
  function failure(error) {
    return { type: types.ADD_TASK_FAILURE, error };
  }
};

export const viewTasksAction = () => {
  return (dispatch) => {
    dispatch(request());
    var tasks = viewTasks();
    dispatch(success(tasks));
  };
  function request() {
    return { type: types.VIEW_ALL_TASKS_REQUEST };
  }
  function success(tasks) {
    return { type: types.VIEW_ALL_TASKS_SUCCESS, tasks };
  }
  function failure(error) {
    return { type: types.VIEW_ALL_TASKS_FAILURE, error };
  }
};

export const updateTaskOrderAction = (tasks) => {
  return (dispatch) => {
    updateTaskOrder(tasks);
    viewTasksAction();
  };
  function request() {
    return { type: types.UPDATE_TASK_ORDER_REQUEST };
  }
  function success() {
    return { type: types.UPDATE_TASK_ORDER_SUCCESS };
  }
  function failure(error) {
    return { type: types.UPDATE_TASK_ORDER_FAILURE, error };
  }
};
