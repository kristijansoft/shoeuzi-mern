import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
  productItem: {
    position: 'relative',
    '&:hover .back': {
      opacity: '.7',
      visibility: 'visible',
      pointerEvents: 'all',
    },
  },
  front: {},
  productImg: {
    width: '100%',
  },
  back: {
    position: 'absolute',
    display: 'flex',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    visibility: 'hidden',
    background: '#C4C4C4',
    pointerEvents: 'none',
    transition: 'opacity .3s ease-in-out',
  },
  addToCartBtn: {
    fontSize: '16px',
    lineHeight: '16px',
    paddingTop: '15px',
    paddingBottom: '15px',
    minWidth: '150px',
    textAlign: 'center',
    background: 'transparent',
    color: '#111111',
    border: '1px solid #000000',
  },
}));
const ProductItem = ({ product }) => {
  const classes = useStyles();

  const addToCartHandler = () => {
    console.log('add to cart');
  };
  return (
    <Box>
      <div className={classes.productItem}>
        <div className={classes.front}>
          <img
            src={product.img || '/images/products/default.png'}
            className={classes.productImg}
            alt="Product Item"
          />
        </div>
        <div className={`${classes.back} back`}>
          <Link
            to="#"
            onClick={addToCartHandler}
            className={classes.addToCartBtn}
          >
            ADD TO CART
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default ProductItem;
