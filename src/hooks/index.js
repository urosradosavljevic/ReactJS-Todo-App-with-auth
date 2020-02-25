import { useState, useEffect } from "react";
import * as moment from "moment";
import firebase from "../firebase";
import { collatedTasksExist } from "../helpers";
import red from "@material-ui/core/colors/red";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase.getCurrentUserTasks();

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              task =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });
    return () => unsubscribe();
  }, [selectedProject, tasks]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase.getCurrentUserProjects().then(snapshot => {
      const allProjects = snapshot.docs.map(project => ({
        ...project.data(),
        docId: project.id
      }));

      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    });
  }, [projects]);

  return { projects, setProjects };
};

export const useTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeObj = {
    props: {
      MuiButtonBase: {
        disableRipple: true
      }
    },
    transitions: {
      create: () => "none"
    },
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: red,
      secondary: {
        main: "#ef5350"
      }
    },
    typography: {
      fontSize: 13
    }
  };

  const [theme, setTheme] = useState(themeObj);

  const {
    palette: { type }
  } = theme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light"
      }
    };
    setTheme(updatedTheme);
  };
  return { theme, toggleDarkMode };
};
