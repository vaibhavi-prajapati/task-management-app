import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { updateTaskOrderAction } from "../redux/actions/actions";
import Layout from "./layout/Layout";
import TaskForm from "./reusable/TaskForm";

const EditTask = () => {
  useTitle("Edit Task");

  const { taskId } = useParams();

  const { tasks } = useSelector((state) => state?.AllTasksReducer);

  const [task, setTask] = useState([]);

  const findTaskById = (id) => {
    for (const key in tasks) {
      const tasks1 = tasks[key];
      const foundTask = tasks1.find((task) => task.id == id);
      if (foundTask) {
        return foundTask;
      }
    }
    return null;
  };

  useEffect(() => {
    if (tasks) {
      const task = findTaskById(taskId);
      task && setTask(task);
    }
  }, [tasks]);

  return (
    <Layout>
      {task ? (
        <TaskForm
          action={updateTaskOrderAction}
          title="Edit Task"
          task={task}
        />
      ) : (
        <p>No Task Found</p>
      )}
    </Layout>
  );
};

export default EditTask;
