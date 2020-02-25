import React, { useState } from "react";
import { AddTask } from "../AddTask";
import { Sidebar } from "./Sidebar";
import firebase from "../../firebase";
import {
  Typography,
  Button,
  Toolbar,
  AppBar,
  Drawer,
  Container,
  useMediaQuery,
  IconButton
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { red } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import {useThemeContext} from "../../context"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: red[400]
  },
  title: {
    flexGrow: 1
  }
}));

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const themeObj = useTheme();
  const smallScreenDown = useMediaQuery(themeObj.breakpoints.down("sm"));

  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {toggleDarkMode} = useThemeContext();


  const logout = async () => {
    await firebase.logout();
    history.push("/");
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth="md">
        <Toolbar>
          {smallScreenDown && (
            <>
              <IconButton onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                anchor="left"
              >
                <Sidebar
                  className={classes.sideBar}
                  drawer={true}
                  setOpen={setMenuOpen}
                />
              </Drawer>
            </>
          )}
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Button
            onClick={() => {
              setShowQuickAddTask(true);
              setShouldShowMain(true);
            }}
          >
            <AddIcon />
          </Button>
          <Button
            onClick={() => {
              toggleDarkMode();
            }}
          >
            {themeObj.palette.type ==="dark" ? <WbSunnyIcon /> : <Brightness2Icon />}
          </Button>

          <Button onClick={logout}>
            <Typography variant="body1" element="span">
              Sign out
            </Typography>
          </Button>
        </Toolbar>
      </Container>
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </AppBar>
  );
};
