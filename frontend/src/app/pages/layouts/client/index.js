import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles({
  root: {
    minHeight: '524px',
  },
});

const ClientLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header />
      <Box className={classes.root}>{children}</Box>
      <Footer />
    </React.Fragment>
  );
};

export default ClientLayout;
