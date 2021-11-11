import React from 'react';
import ProductItem from '../../components/Products/ProductItem';
import { feedProducts } from '../../data/mockData';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, Grid } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
}));

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const items = feedProducts;
  return (
    <Box className={classes.root}>
      <Box className="page">
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={4} md={3} lg={3} key={item.id}>
              <ProductItem product={item}></ProductItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
