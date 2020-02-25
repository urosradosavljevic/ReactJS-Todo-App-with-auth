import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Popover,
  Button,
  ListItem,
  List,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import firebase from "../firebase";

const useStyles = makeStyles(theme => ({
  deleteProjectConfirm: {
    justifyContent: "flex-end"
  }
}));

export const IndividualProject = ({ project }) => {
  const [showConfirmAnchorEl, setShowConfirmAnchorEl] = useState(null);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const classes = useStyles();

  const open = Boolean(showConfirmAnchorEl);

  const deleteProject = docId => {
    firebase.deleteCurrentUserProject(docId).then(() => {
      setProjects([...projects]);
      setSelectedProject("INBOX");
    });
  };

  return (
    <>
      <ListItemIcon>
        <FiberManualRecordIcon />
      </ListItemIcon>
      <ListItemText primary={project.name} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Delete project"
          role="button"
          onClick={e => setShowConfirmAnchorEl(e.currentTarget)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <DeleteIcon />
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        anchorEl={showConfirmAnchorEl}
        onClose={() => setShowConfirmAnchorEl(null)}
      >
        <List container spacing={2}>
          <ListItem>
            <ListItemText>
              Are you sure you want to delete this project?
            </ListItemText>
          </ListItem>
          <ListItem className={classes.deleteProjectConfirm}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteProject(project.docId)}
            >
              Delete
            </Button>
            <Button onClick={() => setShowConfirmAnchorEl(null)}>Cancel</Button>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    projectId: PropTypes.string,
    userId: PropTypes.string
  })
};
