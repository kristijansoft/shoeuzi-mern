import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  palette: {
    type: 'light',
    gray: {
      main: '#E5E5E5',
    },
    text: {
      main: '#111111',
      gray: '#595959',
      border: '#E1E2E4',
      red: '#f00',
    },
    input: {
      main: '#F5F5F5',
    },
    button: {
      main: '#111111',
      secondary: '#4B4B4B',
      white: '#ffffff',
      disable: '#EDEDED',
    },
  },
  typography: {
    subtitle1: {
      fontSize: '24px',
      lineHeight: '24px',
      fontWeight: 600,
      color: '#111111',
    },
    subtitle2: {},
    h2: {
      fontSize: '28px',
      lineHeight: '28px',
      color: '#111111',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '24px',
      color: '#111111',
    },
    h4: {
      fontSize: '20px',
      lineHeight: '20px',
      color: '#111111',
    },
    h5: {
      fontSize: '16px',
      lineHeight: '16px%',
      color: '#595959',
      fontWeight: '550',
    },
    caption: {},
    body1: {
      fontSize: '14px',
      lineHeight: '14px',
      color: '#111111',
    },
    body2: {
      fontSize: '18px',
      lineHeight: '18px',
      color: '#111111',
    },
    button: {},
  },
});

const MDTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MDTheme;
