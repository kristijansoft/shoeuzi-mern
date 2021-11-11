import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import useMatchRoute from './hooks/useMatchRoute';
import ClientLayout from './pages/layouts/client';
import PageNotFound from './pages/_error/PageNotFound';

const AppLayout = ({ children }) => {
  const { matchedRoute } = useMatchRoute();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const snackbar = useSelector((state) => state.ui.snackbar);

  useEffect(() => {
    if (snackbar.message !== '') {
      enqueueSnackbar(snackbar.message, {
        variant: snackbar.variant,
        preventDuplicate: true,
        autoHideDuration: 2000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        color: '#ccc',
        onClick: () => closeSnackbar(),
      });
    }
  }, [enqueueSnackbar, snackbar, closeSnackbar]);

  if (!matchedRoute) {
    return <PageNotFound fallbackurl="/" />;
  }
  return <ClientLayout>{children}</ClientLayout>;
};

export default AppLayout;
