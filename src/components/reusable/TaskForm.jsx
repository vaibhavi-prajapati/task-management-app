import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { updateTaskOrderAction } from "../../redux/actions/actions";
import InputDropDown from "./InputDropDown";
import InputField from "./InputField";
import TooltipShow from "./ToolTipShow";

const TaskForm = ({ action, title, task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state?.AllTasksReducer);

  const formik = useFormik({
    initialValues: {
      name: "",
      summary: "",
      status: "Added",
      priority: "Low",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      summary: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      priority: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const taskPayload = {
        name: values.name,
        summary: values.summary,
        status: values.status,
        priority: values.priority,
      };
      if (task) updateTaskById(task.id, taskPayload);
      else await dispatch(action(taskPayload));
      formik.resetForm();
      navigate(`/tasks`);
    },
  });

  const updateTaskById = async (id, newData) => {
    let newTasks = tasks;
    for (const key in tasks) {
      const tasksList = tasks[key];
      const taskIndex = tasksList.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        newTasks[key][taskIndex] = { ...tasks[key][taskIndex], ...newData };
        await dispatch(updateTaskOrderAction(newTasks));
        navigate("/tasks");
      }
    }
  };

  const deleteTaskById = async (id) => {
    let newTasks = tasks;
    for (const key in tasks) {
      const tasksList = tasks[key];
      const taskIndex = tasksList.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        newTasks[key].splice(taskIndex, 1);
        await dispatch(updateTaskOrderAction(newTasks));
        navigate("/tasks");
      }
    }
  };

  const handleDelete = () => {
    deleteTaskById(task.id);
  };

  useEffect(() => {
    if (task) {
      formik.setFieldValue("name", task.name);
      formik.setFieldValue("summary", task.summary);
      formik.setFieldValue("status", task.status);
      formik.setFieldValue("priority", task.priority);
    }
  }, [task]);

  return (
    <div className="task-container">
      <div className="task-container-header">
        <h5>{title}</h5>
      </div>
      <div className="d-flex align-items-center mb-4">
        <p className="task-field-label">Task</p>
        <InputField
          fullWidth
          placeholder="Enter Task headline"
          value={formik.values.name}
          type={"text"}
          name="name"
          id="name"
          onChange={formik.handleChange}
          isInvalid={formik.touched.name && formik.errors?.name}
          errorMsg={formik.touched.name && formik.errors?.name}
        />
      </div>

      <div className="d-flex align-items-center mb-4  pt-2">
        <p className="task-field-label">Task Summary</p>
        <InputField
          fullWidth
          placeholder="Enter Task Description"
          value={formik.values.summary}
          type={"text"}
          name="summary"
          id="summary"
          onChange={formik.handleChange}
          isInvalid={formik.touched.summary && formik.errors?.summary}
          errorMsg={formik.touched.summary && formik.errors?.summary}
        />
      </div>

      <div className="d-flex align-items-center mb-4  pt-2">
        <p className="task-field-label">Status</p>
        <InputDropDown
          fullWidth
          placeholder="Select Task Status"
          name="status"
          id="status"
          options={["Added", "Started", "Completed"]}
          onChange={(_event, value) => {
            formik.setFieldValue("status", value);
          }}
          value={formik.values.status}
          disableClearable
        />
      </div>

      <div className="d-flex align-items-center mb-4  pt-2">
        <p className="task-field-label">Priority</p>
        <InputDropDown
          fullWidth
          name="priority"
          id="priority"
          placeholder="Select Task Priority"
          options={["Low", "Medium", "High"]}
          onChange={(_event, value) => {
            formik.setFieldValue("priority", value);
          }}
          value={formik.values.priority}
          disableClearable
        />
      </div>
      <div className="d-flex position-relative">
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          color="primary"
        >
          {task ? "Update" : "Add Task"}
        </Button>
        <Button
          className="btn btn-sm ms-3"
          size="medium"
          variant="outlined"
          onClick={() => navigate(`/tasks`)}
          sx={{ width: "100%" }}
        >
          Cancel
        </Button>
        {task && (
          <span className="add-task-btn">
            <TooltipShow title="Delete">
              <DeleteForeverIcon
                className="btn btn-sm p-0"
                size="large"
                variant="outlined"
                onClick={handleDelete}
                sx={{ color: "#ed4c78", fontSize: "40px" }}
              />
            </TooltipShow>
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
