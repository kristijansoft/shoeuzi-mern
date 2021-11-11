import React from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductItem from '../../components/Products/ProductItem';
import { feedProducts } from '../../data/mockData';

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px',
  },
}));

const Upcoming = () => {
  const classes = useStyles();

  const items = feedProducts;
  return (
    <Box className={classes.root}>
      <Box className="page">
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <ProductItem product={item}></ProductItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Upcoming;
