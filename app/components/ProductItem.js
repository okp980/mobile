import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/theme';

const ProductItem = ({
  id,
  image,
  title,
  desc,
  price,
  oldPrice,
  rating,
  reviews,
  status,
  imgLength,
  onPress,
  imageSrc,
  isLike,
  handleItemLike,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        marginBottom: 10,
      }}>
      <View>
        <Image
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: imgLength ? 1 / 1.3 : 1 / 1,
            borderRadius: 6,
          }}
          source={imageSrc ? {uri: imageSrc} : image}
        />
        <LinearGradient
          colors={['rgba(0,0,0,.3)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            transform: [
              {
                rotateY: '180deg',
              },
            ],
          }}></LinearGradient>
        {status && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 15,
              backgroundColor:
                status == 'Trending' ? COLORS.primary : COLORS.secondary,
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.fontXs, color: COLORS.white}}>{status}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => handleItemLike && handleItemLike(id)}
          style={{
            height: 40,
            width: 40,
            position: 'absolute',
            top: 10,
            right: 10,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isLike ? (
            <FontAwesome color={COLORS.primary} size={24} name="heart" />
          ) : (
            <FontAwesome color={COLORS.white} size={24} name="heart-o" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.font,
            color: COLORS.title,
            marginBottom: 4,
          }}>
          {title}
        </Text>
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
          }}>
          <Text style={{...FONTS.h6}}>{price}</Text>
          <Text
            style={{
              ...FONTS.fontSm,
              textDecorationLine: 'line-through',
              marginLeft: 8,
              marginTop: 2,
            }}>
            {oldPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
