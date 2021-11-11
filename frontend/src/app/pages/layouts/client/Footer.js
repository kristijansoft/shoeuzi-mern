import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Box, Grid } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#111111",
  },
  footerBody: {
    padding: "15px 30px",
    borderBottom: "1px solid #222222",
  },
  footerNav: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    padding: "0px",
    "& li": {
      paddingRight: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  footerNavLink: {
    fontSize: "14px",
    fontWeight: "550",
    lineHeight: "14px",
    color: "#fff",
  },
  copyright: {
    fontSize: "14px",
    lineHeight: "14px",
    fontWeight: "300",
    color: "#595959",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    listStyle: "none",
  },
  socialLinkItem: {
    padding: "0 10px",
    "& a ": {
      fontSize: "14px",
      lineHeight: "14px",
      color: "#595959",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  footerSub: {
    padding: "60px 0 60px 30px",
  },
}));
const Footer = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Box className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        className={classes.footerBody}
      >
        <Grid item>
          <ul className={classes.footerNav}>
            <li>
              <Link to="/contact" className={classes.footerNavLink}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping" className={classes.footerNavLink}>
                Shipping Method
              </Link>
            </li>
            <li>
              <Link to="/terms" className={classes.footerNavLink}>
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item>
          <ul className={classes.socialLinks}>
            <li className={classes.socialLinkItem}>
              <a href="instagram.com/">
                <FiInstagram />
              </a>
            </li>
            <li className={classes.socialLinkItem}>
              <a href="facebook.com/">
                <FiFacebook />
              </a>
            </li>
            <li className={classes.socialLinkItem}>
              <a href="twitter.com/">
                <FiTwitter />
              </a>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={classes.footerSub}
      >
        <Grid item>
          <div className={classes.copyright}>
            <span>© 2021, by j-ldn shop. Powered by WordPress</span>
          </div>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
