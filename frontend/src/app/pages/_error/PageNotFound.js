import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  error404: {
    fontSize: "2rem",
  },
});

const PageNotFound = ({ fallbackurl }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Typography color="secondary" className={classes.error404}>
        404
      </Typography>
      <br />
      <Button onClick={() => history.push(fallbackurl)}>Go To Home Page</Button>
    </Box>
  );
};
export default PageNotFound;
