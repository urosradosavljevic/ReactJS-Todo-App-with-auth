import React, { useState } from "react";
import PropTypes from "prop-types";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  List,
  Box,
  Button,
  IconButton,
  makeStyles,
  DialogContent,
  Dialog,
  DialogTitle,
  Divider,
  DialogActions
} from "@material-ui/core";
import moment from "moment";
import firebase from "../firebase";
import { useSelectedProjectValue } from "../context";
import { TaskProjectPopover } from "./TaskProjectPopover";
import { TaskDatePopover } from "./TaskDatePopover";

const useStyles = makeStyles(theme => ({
  addTaskDialogButtons: {
    padding: theme.spacing(2)
  },
  addTaskActions: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export const AddTask = ({
  showAddTaskMain = true,
  shoulShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskProject, setTaskProject] = useState("");
  const [showMain, setShowMain] = useState(shoulShowMain);
  const [showProjectChooseAnchorEl, setShowProjectChooseAnchorEl] = useState(null);
  const [showDateChooseAnchorEl, setShowDateChooseAnchorEl] = useState(null);

  const { selectedProject } = useSelectedProjectValue();

  const classes = useStyles();

  const addTask = () => {
    const projectId = taskProject || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment()
        .add(7, "days")
        .format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      firebase
        .addCurrentUserTask(projectId, task, collatedDate || taskDate)
        .then(() => {
          setTask("");
          setTaskProject("");
          setShowMain("");
        })
    );
  };

  return (
    <>
      {showAddTaskMain && (
        <>
          {!showMain && (
            <ListItem
              button
              onClick={() => {
                setShowMain(!showMain);
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Task" />
            </ListItem>
          )}
            {showMain && (<List component="div" disablePadding>
              <TextField
                autoFocus
                margin="dense"
                value={task}
                onChange={e => {
                  setTask(e.target.value);
                }}
                label="Task Name"
                type="text"
                fullWidth
              />
              <Box
                component="div"
                className={classes.addTaskActions}
                display="flex"
                fullWidth
              >
                <Box component="div" flexGrow={1}>
                  <Button
                    size="small"
                    component="span"
                    onClick={() => {
                      setShowMain(false)
                      addTask()
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Add Task
                  </Button>
                  <Button
                    size="small"
                    component="span"
                    onClick={() => setShowMain(false)}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box component="div">
                  <IconButton
                    size="small"
                    component="span"
                    onClick={e => setShowProjectChooseAnchorEl(e.currentTarget)}
                  >
                    <ListIcon />
                  </IconButton>
                  <TaskProjectPopover
                    setProject={setTaskProject}
                    showProjectChooseAnchorEl={showProjectChooseAnchorEl}
                    setShowProjectChooseAnchorEl={setShowProjectChooseAnchorEl}
                  />
                  <IconButton
                    size="small"
                    component="span"
                    onClick={e => setShowDateChooseAnchorEl(e.currentTarget)}
                  >
                    <DateRangeIcon />
                  </IconButton>
                  <TaskDatePopover
                    setTaskDate={setTaskDate}
                    showDateChooseAnchorEl={showDateChooseAnchorEl}
                    setShowDateChooseAnchorEl={setShowDateChooseAnchorEl}
                  />
                </Box>
              </Box>
            </List>)}
            
        </>
      )}

      <>
        <Dialog
          open={showQuickAddTask}
          onClose={() => setShowQuickAddTask(false)}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle disablePadding>Add Task</DialogTitle>
          <DialogContent >
            <TextField
              autoFocus
              margin="dense"
              value={task}
              onChange={e => {
                setTask(e.target.value);
              }}
              label="Task Name"
              type="text"
              fullWidth
            />
            <Box
              component="div"
              className={classes.addTaskActions}
              display="flex"
              fullWidth
            ></Box>
          </DialogContent>
          <Divider variant="middle" />
          <DialogActions className={classes.addTaskDialogButtons}>
            <Box component="div" flexGrow={1}>
              <Button
                size="small"
                component="span"
                onClick={() => {
                  addTask()
                  setShowQuickAddTask(false)
                }}
                variant="contained"
                color="primary"
              >
                Add Task
              </Button>
              <Button
                size="small"
                component="span"
                onClick={() => setShowQuickAddTask(false)}
              >
                Cancel
              </Button>
            </Box>
            <IconButton
              size="small"
              component="span"
              onClick={e => setShowProjectChooseAnchorEl(e.currentTarget)}
            >
              <ListIcon />
            </IconButton>
            <TaskProjectPopover
              setProject={setTaskProject}
              showProjectChooseAnchorEl={showProjectChooseAnchorEl}
              setShowProjectChooseAnchorEl={setShowProjectChooseAnchorEl}
            />
            <IconButton
              size="small"
              component="span"
              onClick={e => setShowDateChooseAnchorEl(e.currentTarget)}
            >
              <DateRangeIcon />
            </IconButton>
            <TaskDatePopover
              setTaskDate={setTaskDate}
              showDateChooseAnchorEl={showDateChooseAnchorEl}
              setShowDateChooseAnchorEl={setShowDateChooseAnchorEl}
            />
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};
AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shoulShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func
};