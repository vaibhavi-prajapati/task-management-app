import CloseIcon from " /Close";
import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../redux/Alerts/action";

const Alerts = () => {
  const dispatch = useDispatch();
  const { message, alertType } = useSelector((state) => state?.Alerts);

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 5000);
  }, [message]);

  const handleClose = () => dispatch(clearAlert());

  // alertType : warning, info, success, error
  return (
    <>
      {alertType !== null && (
        <Alert severity={alertType}>
          <AlertTitle>
            {message}{" "}
            <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </AlertTitle>
        </Alert>
      )}
    </>
  );
};

export default Alerts;
