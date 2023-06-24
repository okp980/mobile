import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../constants/theme';
import {useUpdateCartCountMutation} from '../../store/services/cart';
import useModal from '../../hooks/useModal';

const CheckoutItem = ({
  cartProductId,
  image,
  title,
  price,
  cartId,
  oldPrice,
  quantity,
  type,
  onPress,
}) => {
  const [itemQuantity, setItemQuantity] = useState(Number(quantity));
  const [loading, setLoading] = useState(false);
  const [updateCartCount] = useUpdateCartCountMutation();
  const {handleOpenModal} = useModal();

  const handleUpdateCart = async type => {
    try {
      setLoading(true);
      const newCount =
        type === 'add'
          ? Number(itemQuantity) + 1
          : type === 'minus'
          ? Number(itemQuantity) - 1
          : Number(itemQuantity);

      if (newCount === 0) {
        handleOpenModal({cartProductId, cartId});
      } else {
        await updateCartCount({
          cartProductId,
          cartId,
          count: newCount,
        }).unwrap();
        setItemQuantity(newCount);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,

        paddingBottom: 15,
        paddingTop: 15,
      }}>
      <Image
        style={{
          height: 90,
          width: 75,
          borderRadius: 2,
          marginRight: 12,
        }}
        source={{uri: `http://localhost:4000/uploads/${image}`}}
      />
      <View style={{flex: 1, paddingVertical: 7}}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.font,
            color: COLORS.title,
            marginBottom: 4,
          }}>
          {title}
        </Text>
        <Text numberOfLines={1} style={{...FONTS.fontXs, color: COLORS.gray}}>
          {type}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{...FONTS.h6}}>₦{price}</Text>
            <Text
              style={{
                ...FONTS.fontSm,
                textDecorationLine: 'line-through',
                marginLeft: 8,
              }}>
              {oldPrice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              disabled={loading}
              onPress={() => handleUpdateCart('minus')}
              style={{
                height: 25,
                width: 25,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: COLORS.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FeatherIcon size={14} color={COLORS.title} name="minus" />
            </TouchableOpacity>
            <Text
              style={{
                ...FONTS.fontSm,
                ...FONTS.fontBold,
                color: COLORS.title,
                width: 30,
                textAlign: 'center',
              }}>
              {itemQuantity}
            </Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => handleUpdateCart('add')}
              style={{
                height: 25,
                width: 25,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: COLORS.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FeatherIcon size={14} color={COLORS.title} name="plus" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckoutItem;
