import {useDispatch, useSelector} from 'react-redux';
import {selectAuth, setCredentials} from '../store/feature/auth/authSlice';

function useAuth() {
  const token = useSelector(selectAuth);
  const dispatch = useDispatch();

  const setToken = token => {
    dispatch(setCredentials(token));
  };
  return {token, setToken};
}

export default useAuth;
