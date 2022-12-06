import React from "react";
import {TagProps } from "./types";
import { StyledTag } from "./StyledTag";

const Tag: React.FC<TagProps> = ({ startIcon, endIcon, children, ...props }) => (
  <StyledTag {...props}>
    {React.isValidElement(startIcon) &&
      React.cloneElement(startIcon, {
      })}
    {children}
    {React.isValidElement(endIcon) &&
      React.cloneElement(endIcon, {
      })}
  </StyledTag>
);

export default Tag;
