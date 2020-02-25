import firebase from "../firebase";
import React from "react";
import PropTypes from 'prop-types'
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { IconButton } from "@material-ui/core";

export const Checkbox = ({ id, taskDesc }) => {

  const archiveTask = () => {
    firebase.archiveTask(id);
  };

  return (
    <IconButton
      aria-label={`Archive ${taskDesc} task`}
      onClick={() => archiveTask()}
      onKeyDown={() => archiveTask()}
    >
      <RadioButtonUncheckedIcon />
    </IconButton>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  taskDesc: PropTypes.string
}