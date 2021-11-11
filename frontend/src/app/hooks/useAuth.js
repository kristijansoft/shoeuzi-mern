import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const redirectUrl = useSelector((state) => state.auth.redirect_url);

  const pending = useSelector((state) => state.auth.pending);
  const currentUser = useSelector((state) => state.auth.userInfo);

  const gotoPage = () => {
    if (redirectUrl && redirectUrl !== '') {
      history.push(redirectUrl);
      return;
    }
  };

  return {
    isAuthenticated,
    pending,
    currentUser,
    gotoPage,
  };
};

export default useAuth;
