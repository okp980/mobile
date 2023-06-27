import {useDispatch, useSelector} from 'react-redux';
import {
  logout,
  selectAuth,
  setCredentials,
} from '../store/feature/auth/authSlice';

function useAuth() {
  const token = useSelector(selectAuth);
  const dispatch = useDispatch();

  const setToken = token => {
    dispatch(setCredentials(token));
  };
  const handleLogout = token => {
    dispatch(logout());
  };
  return {token, setToken, handleLogout};
}

export default useAuth;
