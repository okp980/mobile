import {useDispatch, useSelector} from 'react-redux';
import {
  closeModal,
  selectModalPayload,
  selectModalType,
  selectModalVisible,
  showModal,
} from '../store/feature/modal/modalSlice';

export default function useModal() {
  const isVisible = useSelector(selectModalVisible);
  const modalType = useSelector(selectModalType);
  const modalPayload = useSelector(selectModalPayload);

  const dispatch = useDispatch();

  const handleOpenModal = payload => {
    dispatch(showModal(payload));
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    isVisible,
    modalType,
    modalPayload,
    handleCloseModal,
    handleOpenModal,
  };
}
