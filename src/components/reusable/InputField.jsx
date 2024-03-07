import { TextField } from "@mui/material";
import classNames from "classnames";
import React from "react";

export default function InputField({ isInvalid, ...props }) {
  return (
    <div className="w-100">
      <label className="form-label" htmlFor={props.id}>
        {props.title}
      </label>
      <TextField
        className={classNames(props.className, {
          "input-error": isInvalid,
        })}
        {...props}
      />

      {props.message ? (
        <span style={{ display: "block" }}>{props?.message}</span>
      ) : (
        ""
      )}

      {isInvalid || props?.errorMsg ? (
        <span style={{ display: "block" }} className="invalid-feedback">
          {props?.errorMsg}
        </span>
      ) : null}
    </div>
  );
}
