import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  Box,
  Grid,
  OutlinedInput,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import InputUnstyled from '@mui/core/InputUnstyled';
import { styled } from '@mui/system';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { signIn } from '../../store/auth/actions';
import { UPDATE_REDIRECT_URL } from '../../store/auth/types';
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router-dom';

const StyledInputElement = styled('input')`
  width: 100%;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    transition: width 200ms ease-out;
  }
`;
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  customerT: {
    fontSize: '28px',
    fontWeight: '400',
    lineHeight: '28px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#000000',
    marginLeft: '2.5vw',
  },
  container: {},
  loginFormWrapper: {
    borderRight: `1px solid ${theme.palette.text.border}`,
  },
  formControl: {
    display: 'block',
  },
  loginForm: {
    padding: '0 .5rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '20px',
    padding: '7px 0',
  },
  fontSubTitle: {
    fontSize: '16px',
    lineHeight: '16px',
    color: '#111111',
    padding: '7px 0',
  },
  loginHelperActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  remembermeInput: {
    '& span': {
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '18px',
    },
  },
  forgotPwdLink: {
    '& span': {
      fontWeight: '300',
      fontSize: '14px',
      lineHeight: '14px',
      color: '#595959',
      cursor: 'pointer',
    },
  },
  submitBtn: {},
  signupSideForm: {
    padding: '0 .5rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  pwdInputAdornment: {
    position: 'absolute',
    top: '20px',
    right: '0',
  },
}));
const Login = () => {
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
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be more than 8 letters'),
    }),
    onSubmit: async (values) => {
      dispatch(signIn(values.email, values.password));
    },
  });

  const openForgotPwdModal = useCallback(() => {
    // dispatch()
  }, [dispatch]);

  return (
    <Box py={2} className={classes.root}>
      <p className={classes.customerT}>CUSTOMER LOGIN</p>
      <Grid container className={classes.container} spacing={3}>
        <Grid item sm={6} xs={12} md={6} className={classes.loginFormWrapper}>
          <form onSubmit={handleSubmit} className={classes.loginForm}>
            <p className={classes.formTitle}>Registered Customers</p>
            <p className={classes.formSubTitle}>
              If you have an account, sign in with your email address.
            </p>
            <FormControl
              variant="filled"
              className={classes.formControl}
              sx={{ marginBottom: '26px' }}
              fullWidth
            >
              <CustomInput
                id="email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                aria-label="Demo input"
                placeholder="Email"
              />
              {errors && errors.email && touched.email && (
                <FormHelperText error={true}>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="filled"
              className={classes.formControl}
              fullWidth
              sx={{ marginBottom: '30px' }}
            >
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

            <div className={classes.loginHelperActions}>
              <div className={classes.remembermeInput}>
                <Checkbox
                  inputProps={{ 'aria-label': 'Remember Me' }}
                  defaultChecked
                  color="default"
                />
                <span>Remember Me</span>
              </div>
              <div className={classes.forgotPwdLink}>
                <span onClick={openForgotPwdModal}>Forgot Your Password?</span>
              </div>
            </div>

            <Button
              variant="contained"
              type="submit"
              className={`${classes.submitBtn} sh-btn`}
            >
              Sign In
            </Button>
          </form>
        </Grid>
        <Grid item sm={6} xs={12} md={6}>
          <form className={classes.signupSideForm}>
            <p className={classes.formTitle}>New Customers</p>
            <p>
              Creating an account has many benefits: check out faster, keep more
              than one address, track orders and more.
            </p>
            <Button
              variant="contained"
              className={`${classes.registerBtn} sh-btn`}
              onClick={() => history.push('/register')}
            >
              Create an Account
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
