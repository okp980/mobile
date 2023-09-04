import {StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DeleteCartItem from './DeleteCartItem';
import {
  DELETE_ITEM_CONTENT,
  FULL_SCREEN_LOADER,
  PRODUCT_DESCRIPTION,
  RETURN_POLICY,
  SELECT_VARIANT,
} from '../../constants/modal';
import useModal from '../../../hooks/useModal';
import FullScreenLoader from './FullScreenLoader';
import SelectVariant from './SelectVariant/SelectVariant';
import ReturnPolicy from './ReturnPolicy/ReturnPolicy';
import ProductDescription from './ProductDescription/ProductDescription';

const ModalManager = () => {
  const {isVisible, handleCloseModal, modalType} = useModal();

  const content =
    modalType === DELETE_ITEM_CONTENT ? (
      <DeleteCartItem />
    ) : modalType === FULL_SCREEN_LOADER ? (
      <FullScreenLoader />
    ) : modalType === SELECT_VARIANT ? (
      <SelectVariant />
    ) : modalType === RETURN_POLICY ? (
      <ReturnPolicy />
    ) : modalType === PRODUCT_DESCRIPTION ? (
      <ProductDescription />
    ) : null;
  return (
    <Modal
      style={{margin: 0}}
      isVisible={isVisible}
      onBackdropPress={handleCloseModal}
      onBackButtonPress={handleCloseModal}>
      {content}
    </Modal>
  );
};

export default ModalManager;

const styles = StyleSheet.create({});
