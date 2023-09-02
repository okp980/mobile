import {StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DeleteCartItem from './DeleteCartItem';
import {
  DELETE_ITEM_CONTENT,
  FULL_SCREEN_LOADER,
  SELECT_VARIANT,
} from '../../constants/modal';
import useModal from '../../../hooks/useModal';
import FullScreenLoader from './FullScreenLoader';
import SelectVariant from './SelectVariant/SelectVariant';

const ModalManager = () => {
  const {isVisible, modalType} = useModal();

  const content =
    modalType === DELETE_ITEM_CONTENT ? (
      <DeleteCartItem />
    ) : modalType === FULL_SCREEN_LOADER ? (
      <FullScreenLoader />
    ) : modalType === SELECT_VARIANT ? (
      <SelectVariant />
    ) : null;
  return (
    <Modal style={{margin: 0}} isVisible={isVisible}>
      {content}
    </Modal>
  );
};

export default ModalManager;

const styles = StyleSheet.create({});
