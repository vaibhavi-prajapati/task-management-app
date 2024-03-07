import { Autocomplete, TextField } from "@mui/material";
import classNames from "classnames";
import React from "react";

export default function InputDropDown(props) {
  return (
    <>
      <label className="form-label" htmlFor={props.id}>
        {props?.title}
      </label>

      <Autocomplete
        disablePortal
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            {...(props.onEnterClickDoNothing && {
              onKeyDown: (e) => {
                if (e.key === "Enter") e.preventDefault();
              },
            })}
            name={props.name}
            className={classNames(props.className, {
              "input-error": props?.isInvalid,
            })}
            placeholder={props.placeholder}
            autoFocus={props.textFieldAutoFocus ? true : false}
          />
        )}
      />

      {props?.message ? (
        <span style={{ display: "block" }}>{props?.message}</span>
      ) : (
        ""
      )}

      {props?.isInvalid || props?.errorMsg ? (
        <span style={{ display: "block" }} className="invalid-feedback">
          {props?.errorMsg}
        </span>
      ) : null}
    </>
  );
}
