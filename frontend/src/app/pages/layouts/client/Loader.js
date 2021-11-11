import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#00000052",
    zIndex: 100000,

    "& span": {
      display: "block",
      width: "1rem",
      height: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: "#09e5ab",
      margin: "0.5rem",
      animation: `$spark 0.3s linear 2s infinite alternate`,
      "&:nth-child(odd)": {
        animationDelay: 0.2,
      },
    },
  },
  "@keyframes spark": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
