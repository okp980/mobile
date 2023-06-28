import {StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DeleteCartItem from './DeleteCartItem';
import {DELETE_ITEM_CONTENT, FULL_SCREEN_LOADER} from '../../constants/modal';
import useModal from '../../../hooks/useModal';
import FullScreenLoader from './FullScreenLoader';

const ModalManager = () => {
  const {isVisible, modalType} = useModal();

  const content =
    modalType === DELETE_ITEM_CONTENT ? (
      <DeleteCartItem />
    ) : modalType === FULL_SCREEN_LOADER ? (
      <FullScreenLoader />
    ) : null;
  return <Modal isVisible={isVisible}>{content}</Modal>;
};

export default ModalManager;

const styles = StyleSheet.create({});
