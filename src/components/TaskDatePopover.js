import React from "react";
import PropTypes from "prop-types";
import TodayIcon from "@material-ui/icons/Today";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Filter7Icon from "@material-ui/icons/Filter7";
import {
  List,
  Popover,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import moment from "moment";

export const TaskDatePopover = ({
  setTaskDate,
  showDateChooseAnchorEl,
  setShowDateChooseAnchorEl
}) => {
  const open = Boolean(showDateChooseAnchorEl);

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
      anchorEl={showDateChooseAnchorEl}
      onClose={() => setShowDateChooseAnchorEl(null)}
    >
      <List>
        <ListItem
          button
          aria-label="Select today as task date"
          onClick={() => {
            setShowDateChooseAnchorEl(null);
            setTaskDate(moment().format("DD/MM/YYYY"));
          }}
        >
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText>Today</ListItemText>
        </ListItem>

        <Divider />
        <ListItem
          button
          aria-label="Select tomorow as task date"
          onClick={() => {
            setShowDateChooseAnchorEl(null);
            setTaskDate(
              moment()
                .add(1, "day")
                .format("DD/MM/YYYY")
            );
          }}
        >
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText>Tomorow</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          button
          aria-label="Select next week as the task date"
          onClick={() => {
            setShowDateChooseAnchorEl(null);
            setTaskDate(
              moment()
                .add(7, "day")
                .format("DD/MM/YYYY")
            );
          }}
        >
          <ListItemIcon>
            <Filter7Icon />
          </ListItemIcon>
          <ListItemText>Next week</ListItemText>
        </ListItem>
      </List>
    </Popover>
  );
};

TaskDatePopover.propTypes = {
  setTaskDate: PropTypes.func,
  showTaskDate: PropTypes.bool,
  setShowTaskDate: PropTypes.func
};
