import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {BASE, baseURL} from '../../config/api';
import {ProductDetail_Route} from '../constants/routes';
import {getMaxPrice, getMinPrice, getPrice} from '../../helpers/util';
import CacheImage from './CacheImage/CacheImage';

const ShopItem = ({item, handleLike, index, ...props}) => {
  const navigation = useNavigation();

  const handleProductPrice = () => {
    let price;
    if (item?.product_type === 'simple') {
      price = item?.price_in_naira;
      price = getPrice(price);
    } else if (item?.product_type === 'variable') {
      const minPrice = getMinPrice(item?.variants);
      const maxPrice = getMaxPrice(item?.variants);
      price =
        minPrice === maxPrice
          ? getPrice(minPrice)
          : `${getPrice(minPrice)} - ${getPrice(maxPrice)}`;
    } else {
      price = null;
    }

    return price;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate(ProductDetail_Route, {
          product: props?.id || item.id,
        })
      }
      style={{
        flex: 1,
      }}>
      <View
        style={{
          // width: 150,
          elevation: 10,
        }}>
        {/* <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
          }}
          onPress={() => handleLike(item.id)}>
          {item.isLike ? (
            <FontAwesome name="heart" color={COLORS.primary} size={22} />
          ) : (
            <FontAwesome name="heart-o" color={COLORS.white} size={22} />
          )}
        </TouchableOpacity> */}
        <CacheImage
          style={{
            // width: 200,
            height: 150,
            borderRadius: SIZES.radius_xs,
          }}
          source={{
            uri: item?.image,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <Text style={{...FONTS.font, color: COLORS.text}}>
          {props?.name || item?.name}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text
              style={{
                ...FONTS.font,
                ...FONTS.fontBold,
                color: COLORS.dark,
                marginRight: 5,
              }}>
              {handleProductPrice()}
            </Text>
            {/* <Text style={{...FONTS.font, textDecorationLine: 'line-through'}}>
              ₦33.99
            </Text> */}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <FontAwesome name="star" color="#FFA800" size={16} />
            <Text
              style={{
                ...FONTS.font,
                color: COLORS.title,
                ...FONTS.fontBold,
                marginLeft: 4,
              }}>
              {item.rating}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopItem;
