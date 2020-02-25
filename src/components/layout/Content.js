import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks";
import { Container, Grid, useTheme, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingTop: "20px"
  }
}));

export const Content = () => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreenUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Container maxWidth="md">
      <Grid
        container
        p={6}
        spacing={4}
        direction="row"
        className={classes.mainContainer}
      >
        {smallScreenUp && (
          <Grid item xs={12} sm={4}>
            <Sidebar />
          </Grid>
        )}
        <Grid item xs={12} sm={8}>
          <Tasks />
        </Grid>
      </Grid>
    </Container>
  );
};
