import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React from "react";

export default function TooltipShow({
  children,
  title,
  color = "#0f234a",
  ...props
}) {
  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: color,
    },
  }));

  return <StyledTooltip title={title}>{children}</StyledTooltip>;
}
