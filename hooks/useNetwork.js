import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsConnected,
  setNetwork,
} from '../store/feature/network/networkSlice';

function useNetwork() {
  const isConnected = useSelector(selectIsConnected);
  const dispatch = useDispatch();

  const setIsConnected = status => {
    dispatch(setNetwork(status));
  };
  return {isConnected, setIsConnected};
}

export default useNetwork;
