import {useSelector} from 'react-redux';
import {selectAuth} from '../store/feature/auth/authSlice';

function useAuth() {
  const token = useSelector(selectAuth);
  return {token};
}

export default useAuth;
