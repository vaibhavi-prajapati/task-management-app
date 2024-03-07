export const addTask = (task) => {
  if (task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) ?? {};

    if (tasks[task.status])
      tasks = { ...tasks, [task.status]: [...tasks[task.status], task] };
    else tasks = { ...tasks, [task.status]: [task] };

    localStorage.setItem("tasks", JSON.stringify(tasks));
    return task;
  }
  return null;
};

export const viewTasks = () => {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks === null ? {} : tasks;
};

export const updateTaskOrder = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
