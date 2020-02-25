import React, { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { Error } from "./components/Error";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress, Box } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./firebase";
import { useThemeContext } from "./context";

export const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  const { theme } = useThemeContext();

  const themeConfig = createMuiTheme(theme);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={Error} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <Box
      style={{ height: "100vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={themeConfig.loader}
    >
      <CircularProgress />
    </Box>
  );
};
