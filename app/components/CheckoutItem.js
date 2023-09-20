import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../constants/theme';
import {useUpdateCartCountMutation} from '../../store/services/cart';
import useModal from '../../hooks/useModal';
import {DELETE_ITEM_CONTENT} from '../constants/modal';
import {BASE} from '../../config/api';
import {getPrice} from '../../helpers/util';
import CacheImage from './CacheImage/CacheImage';

const CheckoutItem = ({
  cartProductId,
  image,
  title,
  price,
  cartId,
  oldPrice,
  quantity,
  type,
  selected,
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
        handleOpenModal({
          type: DELETE_ITEM_CONTENT,
          modalPayload: {cartProductId, cartId},
        });
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

  const handleDeleteCart = async () => {
    try {
      await updateCartCount({
        cartProductId,
        cartId,
        count: 0,
      }).unwrap();
      setItemQuantity(0);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 15,
      }}>
      {/* <TouchableOpacity>
        <IonIcon
          name={selected ? 'radio-button-on' : 'radio-button-off-sharp'}
          size={25}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{flex: 1, flexDirection: 'row'}}>
        <CacheImage
          style={{
            height: 90,
            width: 75,
            borderRadius: 2,
            marginRight: 12,
          }}
          source={{uri: image}}
        />
        <View
          style={{
            flex: 1,
            paddingVertical: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.font,
                color: COLORS.title,
                marginBottom: 4,
              }}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={{...FONTS.fontXs, color: COLORS.gray}}>
              {type}
            </Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{...FONTS.fontLg}}>{getPrice(price)}</Text>
                <Text
                  style={{
                    ...FONTS.fontSm,
                    textDecorationLine: 'line-through',
                    marginLeft: 8,
                  }}>
                  {oldPrice}
                </Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
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

            <TouchableOpacity onPress={handleDeleteCart}>
              <IonIcon name="trash-bin" size={25} color={COLORS.danger} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutItem;
