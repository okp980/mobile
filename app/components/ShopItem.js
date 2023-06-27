import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {baseURL} from '../../config/api';
import {ProductDetail_Route} from '../constants/routes';

const ShopItem = ({item, handleLike, index, ...props}) => {
  const navigation = useNavigation();

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
        // width: 150,
        marginLeft: index % 2 !== 0 ? 10 : 0,
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: 150,
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
        <Image
          style={{
            width: '100%',
            height: 150,
            borderRadius: SIZES.radius_sm,
          }}
          source={{
            uri: `http://localhost:4000/uploads/${props?.image || item?.image}`,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <Text style={{...FONTS.fontXs, color: COLORS.text}}>
          {props?.name || item?.name}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text
              style={{
                ...FONTS.fontLg,
                ...FONTS.fontBold,
                color: COLORS.dark,
                marginRight: 5,
              }}>
              ₦{props?.price || item?.price}
            </Text>
            {/* <Text style={{...FONTS.font, top: 3}}>{item.oldPrice}</Text> */}
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
