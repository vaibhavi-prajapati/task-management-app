import Add from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/Flag";
import { Button } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Draggable } from "react-smooth-dnd";
import { useTitle } from "../hooks/useTitle";
import {
  updateTaskOrderAction,
  viewTasksAction,
} from "../redux/actions/actions";
import Layout from "./layout/Layout";
import TooltipShow from "./reusable/ToolTipShow";

const TaskList = () => {
  useTitle("All Tasks");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state?.AllTasksReducer);

  const [taskData, setTaskData] = useState([]);

  const onDrop = async (dragResult, status) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return;

    const result = taskData[status] ? [...taskData[status]] : [];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    await setTaskData((prevTaskData) => {
      const newData = { ...prevTaskData, [status]: [...result] };
      dispatch(updateTaskOrderAction(newData));
      return newData;
    });
  };

  useEffect(() => {
    setTaskData(tasks);
  }, [tasks]);

  useEffect(() => {
    dispatch(viewTasksAction());
  }, []);

  return (
    <Layout>
      <div className="taskList-container">
        <div className="d-flex align-items-end position-relative">
          <h1 className="taskList-header">All Tasks</h1>
          <span className="add-task-btn">
            <Button
              className="btn btn-sm"
              size="medium"
              variant="outlined"
              startIcon={<Add style={{ cursor: "pointer" }} />}
              onClick={() => navigate(`/add-task`)}
              sx={{ width: "100%" }}
            >
              Add Task
            </Button>
          </span>
        </div>

        <div>
          <ul className="ul-task-status">
            {["Added", "Started", "Completed"].map((status, index) => (
              <li
                className={classNames("li-task-status", {
                  "status-added": status == "Added",
                  "status-started": status == "Started",
                  "status-completed": status == "Completed",
                })}
                key={index}
              >
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <span className="font-weight-bold">{status}</span>
                  <span className="chip ms-2">
                    {taskData[status]?.length || 0}
                  </span>
                </div>
                <div
                  className={classNames({
                    "draggable-div": taskData[status]?.length != 0,
                    "draggable-empty-div":
                      taskData[status]?.length == 0 || !taskData[status],
                  })}
                >
                  <Container
                    groupName="1"
                    getChildPayload={(i) => taskData[status][i]}
                    onDrop={(dragResult) => {
                      onDrop(dragResult, status);
                    }}
                    style={{
                      height: "100%",
                    }}
                  >
                    {taskData[status]?.map((item) => (
                      <Draggable
                        key={item.id}
                        onClick={() => navigate(`/task/${item.id}`)}
                      >
                        <div className="draggable-task mb-3 d-flex justify-content-between">
                          <p className="task-name text-truncate">{item.name}</p>
                          <TooltipShow title={item.priority}>
                            <FlagIcon
                              style={{ cursor: "pointer" }}
                              sx={{
                                color:
                                  item.priority == "High"
                                    ? "#f44336"
                                    : item.priority == "Medium"
                                    ? "#ffc107"
                                    : "#07c37f",
                              }}
                              className="ps-2"
                            />
                          </TooltipShow>
                        </div>
                      </Draggable>
                    ))}
                  </Container>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default TaskList;
