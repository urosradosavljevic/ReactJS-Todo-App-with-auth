import React from "react";
import PropTypes from "prop-types";
import { useProjectsValue } from "../context";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Popover,
  Divider
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export const TaskProjectPopover = ({
  setProject,
  showProjectChooseAnchorEl,
  setShowProjectChooseAnchorEl
}) => {
  const { projects } = useProjectsValue();

  const open = Boolean(showProjectChooseAnchorEl);

  return (
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
      anchorEl={showProjectChooseAnchorEl}
      onClose={() => setShowProjectChooseAnchorEl(null)}
    >
      <List>
        {projects.map(project => (
          <>
            <ListItem
              button
              onClick={() => {
                setProject(project.projectId);
                setShowProjectChooseAnchorEl(null);
              }}
              aria-label="Select the task project"
            >
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText>{project.name}</ListItemText>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Popover>
  );
};

TaskProjectPopover.propTypes = {
  setProject: PropTypes.func,
  showProjectOverlay: PropTypes.bool,
  setShowProjectOverlay: PropTypes.func
};
