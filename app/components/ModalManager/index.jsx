import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import DeleteCartItem from './DeleteCartItem';
import {DELETE_ITEM_CONTENT} from '../../constants/modal';
import useModal from '../../../hooks/useModal';

const ModalManager = () => {
  const {isVisible} = useModal();

  const type = DELETE_ITEM_CONTENT;

  const content = type === DELETE_ITEM_CONTENT ? <DeleteCartItem /> : null;
  return <Modal isVisible={isVisible}>{content}</Modal>;
};

export default ModalManager;

const styles = StyleSheet.create({});
