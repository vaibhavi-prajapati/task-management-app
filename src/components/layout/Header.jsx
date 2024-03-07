import AssignmentIcon from "@mui/icons-material/Assignment";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-div d-flex align-items-center p-1 pb-0">
      <AssignmentIcon
        style={{ cursor: "pointer" }}
        sx={{ color: "#4b0149", fontSize: "80px" }}
        className="ps-2"
        onClick={() => navigate(`/tasks`)}
      />
      <span className="ms-4">
        <h1>Task Mania</h1>
      </span>
      <span className="mt-2">
        <a
          className=" ps-2 mb-0 pb-0 text-decoration-none"
          href="https://www.linkedin.com/in/VaibhaviPrajapati"
          target="blanck"
        >
          by Vaibhavi Prajapati
        </a>
      </span>
    </div>
  );
}

export default Header;
