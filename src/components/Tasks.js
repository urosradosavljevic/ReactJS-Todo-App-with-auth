import React, { useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { AddTask } from "./AddTask";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName} : Todo App`;
  });

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {projectName}
      </Typography>
      <List>
        {tasks.map(task => (
          <>
            <ListItem key={task.id}>
              <ListItemIcon>
                <Checkbox id={task.id} taskDesc={task.title} />
              </ListItemIcon>
              <ListItemText>{task.title}</ListItemText>
            </ListItem>
            <Divider />
          </>
        ))}
        <AddTask />
      </List>
    </>
  );
};
