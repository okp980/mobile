import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../CustomButton';
import {COLORS, FONTS} from '../../../constants/theme';
import {useUpdateCartCountMutation} from '../../../../store/services/cart';
import useModal from '../../../../hooks/useModal';

const DeleteCartItem = () => {
  const [loading, setLoading] = useState(false);
  const [updateCartCount] = useUpdateCartCountMutation();
  const {modalPayload, handleCloseModal} = useModal();

  const handleDeleteCartItem = async () => {
    try {
      setLoading(true);
      await updateCartCount({
        cartProductId: modalPayload?.cartProductId,
        cartId: modalPayload?.cartId,
        count: 0,
      }).unwrap();
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <View style={{backgroundColor: COLORS.white, padding: 20}}>
      <Text
        style={{
          ...FONTS.h5,
          //   ...FONTS.fontBold,
          textAlign: 'center',
          paddingVertical: 20,
        }}>
        Do you want to delete this item?
      </Text>
      <View style={{flexDirection: 'row'}}>
        <CustomButton
          onPress={handleCloseModal}
          title="Cancel"
          customStyles={{flex: 1}}
          color={COLORS.white}
          textColor={COLORS.dark}
          btnSm
        />
        <View style={{width: 10}} />
        <CustomButton
          onPress={handleDeleteCartItem}
          title="Delete"
          customStyles={{flex: 1}}
          color={COLORS.dark}
          btnSm
        />
      </View>
    </View>
  );
};

export default DeleteCartItem;

const styles = StyleSheet.create({});
