import React from "react";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ProjectProvider, SelectedProjectProvider } from "../context";
import { Header } from "./layout/Header";
import { Content } from "./layout/Content";

export const Dashboard = () => {

  const history = useHistory();

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    history.replace("/login");
    return null;
  }

  return (
    <SelectedProjectProvider>
      <ProjectProvider>
        <CssBaseline />
        <Header />
        <Content />
      </ProjectProvider>
    </SelectedProjectProvider>
  );
};
