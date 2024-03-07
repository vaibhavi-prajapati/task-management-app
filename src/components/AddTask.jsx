import React from "react";
import { useTitle } from "../hooks/useTitle";
import { addTaskAction } from "../redux/actions/actions";
import Layout from "./layout/Layout";
import TaskForm from "./reusable/TaskForm";

const AddTask = () => {
  useTitle("Add Task");

  return (
    <Layout>
      <TaskForm action={addTaskAction} title="Add new Task" />
    </Layout>
  );
};

export default AddTask;
