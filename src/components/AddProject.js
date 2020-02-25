import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
import { generatePushID } from "../helpers";
import { useProjectsValue } from "../context";
import {
  makeStyles,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Divider
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  addProject: {
    marginTop: theme.spacing(1)
  },
  addProjectDialogButtons:{
	  padding: theme.spacing(2)
  },
  addProjectDialogContent:{
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingBottom: theme.spacing(3),
  },
  addProjectButton:{
	marginBottom: theme.spacing(2),
	marginTop: theme.spacing(2),
  },
  smallerfont:{
	  fontSize:12,
  }

}));

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const classes = useStyles();

  const projectId = generatePushID();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    projectName &&
      firebase.addCurrentUserProject(projectId, projectName).then(() => {
        setProjects([...projects]);
        setProjectName("");
        setShow(false);
      });
  };

  return show ? (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
	  aria-labelledby="form-dialog-title"
	  fullWidth={true}
	  maxWidth='xs'
    >
      <DialogTitle disablePadding>Add Project</DialogTitle>
      <DialogContent className={classes.addProjectDialogContent}>
        <TextField
          autoFocus
          margin="dense"
          value={projectName}
          onChange={e => {
            setProjectName(e.target.value);
          }}
          label="Project Name"
          type="text"
          fullWidth
        />
      </DialogContent>
	  <Divider/>
      <DialogActions className={classes.addProjectDialogButtons}>
        <Button onClick={() => addProject()} variant="contained" color="primary" >
          Add Project
        </Button>
        <Button onClick={() => setShow(false)} >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <ListItem button onClick={() => setShow(true)} className={classes.addProjectButton}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Project" />
    </ListItem>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool
};
