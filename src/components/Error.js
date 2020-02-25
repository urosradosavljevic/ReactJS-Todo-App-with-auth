import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    "&>*": {
      margin: theme.spacing(2)
    }
  }
}));

export const Error = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Typography component="h1" variant="h1">
          404
        </Typography>
        <Typography component="h2" variant="h3">
          Page not found :(
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            history.push("/");
          }}
        >
          Home page
        </Button>
      </Grid>
    </Container>
  );
};
