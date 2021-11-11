import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@mui/styles';
import {
  Grid,
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import CustomInput from 'app/components/CustomInput/CustomInput';
import useAuth from 'app/hooks/useAuth';
import { signUp } from '../../store/auth/actions';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { countries } from 'app/data/countries';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formControl: {
    display: 'block',
  },
  formLabel: {
    '& > span': {
      color: theme.palette.text.red,
    },
  },
  pwdInputAdornment: {
    position: 'absolute',
    top: '2.7rem',
    right: '0',
  },
}));

const Register = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { currentUser, isAuthenticated, gotoPage } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [history, currentUser]);

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      country: '',
      addressOne: '',
      addressTwo: '',
      postcode: '',
      phone: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be more than 8 letters'),
      addressOne: Yup.string().required('Address is required'),
      addressTwo: Yup.string().required('Address 2 is required'),
      postcode: Yup.string().required('Postcode is required'),
      phone: Yup.string().required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      console.log('Form submit => ', values);
      dispatch(
        signUp(
          values.firstName + ' ' + values.lastName,
          values.email,
          values.password,
          values.addressOne,
          values.addressTwo,
          values.postcode,
          values.phone
        )
      );
    },
  });

  return (
    <Box py={2} className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.registerForm}>
        <Grid container className={classes.container} spacing={3}>
          <Grid item sm={6} xs={12}>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                First name <span>*</span>
              </Typography>
              <CustomInput
                id="firstName"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors && errors.firstName && touched.firstName && (
                <FormHelperText error={true}>{errors.firstName}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Email <span>*</span>
              </Typography>
              <CustomInput
                id="email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors && errors.email && touched.email && (
                <FormHelperText error={true}>{errors.email}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Country<span>*</span>
              </Typography>
              <Autocomplete
                id="country-select-demo"
                size="small"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {errors && errors.country && touched.country && (
                <FormHelperText error={true}>{errors.country}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Address 2<span>*</span>
              </Typography>
              <CustomInput
                id="addressTwo"
                type="text"
                name="addressTwo"
                value={values.addressTwo}
                onChange={handleChange}
                placeholder="Apartment, suite, unit etc. (optional)"
              />
              {errors && errors.addressTwo && touched.addressTwo && (
                <FormHelperText error={true}>
                  {errors.addressTwo}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Postcode<span>*</span>
              </Typography>
              <CustomInput
                id="postcode"
                type="text"
                name="postcode"
                value={values.postcode}
                onChange={handleChange}
                placeholder="Enter your postcode / zip"
              />
              {errors && errors.postcode && touched.postcode && (
                <FormHelperText error={true}>{errors.postcode}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Last name<span>*</span>
              </Typography>
              <CustomInput
                id="lastName"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors && errors.lastName && touched.lastName && (
                <FormHelperText error={true}>{errors.lastName}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
              fullWidth
              sx={{ marginBottom: '30px' }}
            >
              <Typography className={classes.formLabel}>
                Password<span>*</span>
              </Typography>
              <CustomInput
                id="password"
                type={`${showPassword ? 'text' : 'password'}`}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={classes.pwdInputAdornment}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {errors && errors.password && touched.password && (
                <FormHelperText error={true}>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Address<span>*</span>
              </Typography>
              <CustomInput
                id="addressOne"
                type="text"
                name="addressOne"
                value={values.addressOne}
                onChange={handleChange}
                placeholder="House number and street name"
              />
              {errors && errors.addressOne && touched.addressOne && (
                <FormHelperText error={true}>
                  {errors.addressOne}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                City<span>*</span>
              </Typography>
              <CustomInput
                id="city"
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
              {errors && errors.city && touched.city && (
                <FormHelperText error={true}>{errors.city}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <Typography className={classes.formLabel}>
                Phone<span>*</span>
              </Typography>
              <CustomInput
                id="phone"
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
              />
              {errors && errors.phone && touched.phone && (
                <FormHelperText error={true}>{errors.phone}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Box
          display="flex"
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            type="submit"
            className={`${classes.registerBtn} sh-btn`}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
