import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { feedProducts } from '../../data/mockData';

const useStyles = makeStyles((theme) => ({
  root: {},
  productImg: {
    width: '100%',
    height: '100%',
  },
  priceGroup: {},
  addTocartBtn: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buyNowBtn: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
const ProductPage = () => {
  const classes = useStyles();

  const { slug } = useParams();

  const product = feedProducts[0];
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Box>
              <ImageList sx={{ width: '100%', overflow: 'visible' }} cols={2}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box className={classes.productMainInfo}>
              <Typography sx={{ py: 3 }} variant="subtitle1">
                Burner
              </Typography>
              <Typography
                className={classes.productShortDescription}
                variant="body2"
              >
                A porcelain vase and incense burner.
              </Typography>
              <Box className={classes.priceGroup} sx={{ py: 3 }}>
                <Typography variant="h3" component="span">
                  $90
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box className={classes.otherInfo}>
              <Typography>SKU: BURNER</Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="RELEASE DAY: 19 oct 2021" />
                </ListItem>
              </List>
            </Box>
            <Box>
              <Typography paragraph variant="body1">
                Hand casted porcelain, gloss glazed inside and out. Drop in a
                cone incense or use the holes in the nozzle to insert a incense
                stick. The nozzle is also removeable and can be used as a vase.
              </Typography>
              <List>
                <ListItem>
                  <Button
                    variant="contained"
                    className={`sh-btn btn-transparent ${classes.addTocartBtn}`}
                  >
                    ADD TO CART
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    className={`sh-btn ${classes.buyNowBtn}`}
                  >
                    BUY NOW
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;
