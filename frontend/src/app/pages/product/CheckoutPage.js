import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  InputBase,
  IconButton,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

import React, { useEffect, useState } from 'react';
import masterCard from 'assets/images/mastercard.svg';
import { Link as RouterLink } from 'react-router-dom';
import { feedProducts } from 'app/data/mockData';
import { makeStyles } from '@mui/styles';

import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

import BillingAddressForm from 'app/components/BillingAddressForm/BillingAddressForm';
import ShCountDown from 'app/components/CountDown/ShCountDown';

const useStyles = makeStyles((theme) => ({
  root: {},
  orderSummary: {},
  productTableHeader: {
    '& th': {
      fontSize: '14px',
      lineHeight: '14px',
    },
  },
  cartItemImg: {
    objectFit: 'cover',
  },
}));

const CheckoutPage = () => {
  const classes = useStyles();
  const [products, setProducts] = useState(
    feedProducts.filter((item, index) => {
      if (index < 2) return item;
    })
  );
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = React.useState('');

  const [paymentOption, setPaymentOption] = React.useState('card');

  const [cardNumber, setCardNumber] = React.useState('');
  const [cardDate, setCardDate] = React.useState('');
  const [cvvCode, setCVVCode] = React.useState('');

  const [cardNumberError, setCardNumberError] = React.useState('');
  const [expiryDateError, setExpiryDateError] = React.useState('');
  const shippingFee = 0;

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const setSecurityCode = (e) => {
    let cvv = e.target.value;
    const regex = /^\d+$/;
    let isValid = regex.test(cvv);
    if (cvv.length < 4 && isValid) {
      setCVVCode(cvv);
    }
  };

  const setExpiryDate = (e) => {
    let expDate = e.target.value;
    const regex = /^[0-9/]*$/;
    let isValid = regex.test(expDate);
    if (expDate.length < 8 && isValid) {
      if (expDate.length == 2) {
        if (e.keyCode != 8) {
          expDate = expDate + '/';
        }
      }
      setCardDate(expDate);
    }
  };

  const setCreditCardNumber = (e) => {
    setCardNumberError('');
    let ccNum = e.target.value;
    const regex = /^[0-9-]*$/;
    let isValid = regex.test(ccNum);
    if (ccNum.length < 20 && isValid) {
      if (ccNum.length == 4 || ccNum.length == 9 || ccNum.length == 14) {
        if (e.keyCode != 8) {
          ccNum = ccNum + '-';
        }
      }
      setCardNumber(ccNum);
    }
  };

  const validateCreditCardNumber = () => {
    let ccNum = cardNumber.replace(/-/g, '');
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      isValid = true;
    }
    if (isValid) {
      return true;
    } else {
      setCardNumberError(['Please provide a valid card number!']);
      return false;
    }
  };

  const validateExpiryData = () => {
    var today, newDay;
    let cardMY = cardDate.split('/');
    var exMonth = cardMY[0];
    var exYear = cardMY[1];
    today = new Date();
    newDay = new Date();
    newDay.setFullYear(exYear, exMonth, 1);
    if (newDay < today) {
      setExpiryDateError('Invalid expiry date');
      return false;
    }
    return true;
  };

  const updateQuantity = (product, index, action) => {
    product.quantity =
      action === 'add'
        ? parseInt(product.quantity) + 1
        : parseInt(product.quantity) - 1;

    setProducts((prevState) => [
      ...prevState,
      prevState.splice(index, 1, product),
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateCreditCardNumber()) return false;
    if (validateExpiryData()) return false;
  };

  var cartData = (
    <div>
      <Grid container spacing={2}>
        <Card>
          <CardContent>
            <h1>Your shopping cart is empty</h1>

            <Button variant="contained" color="primary" href="#">
              Empty Cart
            </Button>
            <p>You may add items to your shopping cart here.</p>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
  var productsList = <div> </div>;

  if (cart) {
    productsList = (
      <Box className="product-table">
        <TableContainer>
          <Table
            sx={{ minWidth: 650, border: 'none' }}
            size="small"
            aria-label="simple table"
          >
            <TableHead className={classes.productTableHeader}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left" className={classes.collapsable}>
                  Total
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    '& > td': { border: 0, paddingTop: '18px' },
                    verticalAlign: 'top',
                  }}
                >
                  <TableCell
                    scope="row"
                    sx={{ display: 'flex', paddingTop: '18px' }}
                  >
                    <img
                      src={product.img}
                      width="50"
                      height="50"
                      className={classes.cartItemImg}
                      alt="Cart item"
                    />
                    <Typography component="span" sx={{ pl: 2 }}>
                      {product.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">${product.price}</TableCell>
                  <TableCell align="left">
                    <Box component="div" className="quantity">
                      <Box
                        className="number-field"
                        sx={{
                          width: 'fit-content',
                          border: '1px solid #E1E2E4',
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            this.updateQuantity(product, index, 'rem')
                          }
                          className="remove-quantity"
                          size="small"
                          component="span"
                          disabled={product.quantity <= 1}
                        >
                          <FiMinus />
                        </IconButton>
                        <InputBase
                          size="small"
                          sx={{
                            width: '50px',
                            '& > input': { textAlign: 'center' },
                          }}
                          value={product.quantity}
                        />
                        <IconButton
                          onClick={() =>
                            this.updateQuantity(product, index, 'add')
                          }
                          className="add-quantity"
                          size="small"
                          component="span"
                          disabled={
                            parseInt(product.quantity) >=
                            parseInt(product.maxQuantity)
                          }
                        >
                          <FiPlus />
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left" className={classes.collapsable}>
                    50
                  </TableCell>
                  <TableCell>
                    <FaTrashAlt />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  const [value, setValue] = React.useState('female');

  const deliveryHandleChange = (event) => {
    setValue(event.target.value);
  };

  const numberWithCommas = (x) => {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const quantity = (products) => {
    let total = 0;
    products.forEach(function (product) {
      total = total + parseInt(product.quantity);
    });
    return total;
  };

  const subTotal = (products) => {
    let subTotal = 0;
    products.forEach(function (product, i) {
      subTotal = subTotal + parseInt(product.price) * product.quantity;
    });

    return subTotal;
  };

  const { firstName, lastName, email, phoneNumber } = customer || '';

  const { address_1, address_2, city, state, country, zipcode } =
    customer.address || '';

  const customer_address = !Object.keys(customer).length
    ? ''
    : address_1 +
      ', ' +
      address_2 +
      ', ' +
      city +
      ', ' +
      state +
      ', ' +
      country +
      ' - ' +
      zipcode;

  return (
    <div>
      <Box className="primary-structure" sx={{ py: 2 }}>
        <Container maxWidth="lg">
          <Box className="checkout-page">
            <Typography variant="h3" sx={{ py: 3 }}>
              Checkout
            </Typography>
            <Box className="primary-structure--box">
              <Box className="review-order">{productsList}</Box>

              <Box
                className={classes.orderSummary}
                display="flex"
                sx={{
                  py: 2,
                  px: 2,
                  backgroundColor: '#F5F5F5',
                  textAlign: 'right',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Typography component="span" sx={{ pr: 2 }}>
                  Subtotal{' '}
                </Typography>
                <Typography component="span" variant="h4">
                  {products &&
                    products.length &&
                    products[0].currency +
                      ' ' +
                      numberWithCommas(subTotal(products))}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{ py: 2, alignItems: 'center', flexWrap: 'wrap' }}
                  display="flex"
                >
                  <Typography sx={{ maxWidth: '250px' }} component="div">
                    The product is available for purchase through
                  </Typography>
                  <ShCountDown />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: '600', py: 2 }}>
                  Shipping/Billing address
                </Typography>
                <Typography sx={{ pb: 2 }}>
                  To prevent bot orders and discourage reselling, your shipping
                  and billing address must be the same
                </Typography>
                <BillingAddressForm />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ py: 2 }}>
                  <Button
                    className="sh-btn"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    type="submit"
                  >
                    CHECK OUT
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default CheckoutPage;
