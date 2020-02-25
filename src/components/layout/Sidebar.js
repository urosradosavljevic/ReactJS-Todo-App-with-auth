import React, { useState } from "react";
import InboxIcon from "@material-ui/icons/Inbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useSelectedProjectValue } from "../../context";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  makeStyles
} from "@material-ui/core";

const useStyle = makeStyles(() => ({
  projectsCollapseText: {
    fontWeight: "bold"
  },
  sideBar: {
    width: 250
  }
}));

export const Sidebar = ({ drawer = false, setOpen }) => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  const classes = useStyle();

  return (
    <List className={drawer ? classes.sideBar : undefined}>
      <ListItem
        button
        onClick={() => {
          setActive("inbox");
          setSelectedProject("INBOX");
          drawer && setOpen(false);
        }}
        selected={active === "inbox"}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setActive("today");
          setSelectedProject("TODAY");
          drawer && setOpen(false);
        }}
        selected={active === "today"}
      >
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setActive("next_7");
          setSelectedProject("NEXT_7");
          drawer && setOpen(false);
        }}
        selected={active === "next_7"}
      >
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="Next 7 Days" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          setShowProjects(!showProjects);
        }}
      >
        <ListItemIcon>
          {showProjects ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.projectsCollapseText }}
          primary="Projects"
        />
      </ListItem>
      <Divider />
      <Collapse in={showProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Projects />
        </List>
      </Collapse>
      {showProjects && <AddProject />}
    </List>
  );
};
