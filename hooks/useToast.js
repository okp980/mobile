import {useDispatch, useSelector} from 'react-redux';
import {
  clear,
  selectShowToast,
  selectToastMessage,
  selectToastType,
  setErrorMessage,
  setMessage,
  setSuccessMessage,
  setWarningMessage,
} from '../store/feature/snackbar/snackbarSlice';

function useToast() {
  const show = useSelector(selectShowToast);
  const type = useSelector(selectToastType);
  const message = useSelector(selectToastMessage);
  const dispatch = useDispatch();

  const handleSuccessToast = message => {
    dispatch(setSuccessMessage(message));
  };
  const handleMessageToast = message => {
    dispatch(setMessage(message));
  };
  const handleWarningToast = message => {
    dispatch(setWarningMessage(message));
  };
  const handleErrorToast = message => {
    dispatch(setErrorMessage(message));
  };
  const handleClearToast = () => {
    dispatch(clear());
  };
  return {
    show,
    type,
    message,
    handleMessageToast,
    handleSuccessToast,
    handleWarningToast,
    handleErrorToast,
    handleClearToast,
  };
}

export default useToast;
