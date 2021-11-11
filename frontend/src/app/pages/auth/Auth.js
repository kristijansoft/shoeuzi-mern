import useAuth from 'app/hooks/useAuth';
import { api } from 'app/services';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Auth = ({ children }) => {
  const { pending } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = api.getUserInfo();
    if (userInfo) {
    }
  });

  return <React.Fragment>{children}</React.Fragment>;
};

export default Auth;
