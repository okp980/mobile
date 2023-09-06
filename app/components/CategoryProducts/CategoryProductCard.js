import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropShadow from 'react-native-drop-shadow';

import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {getPrice} from '../../../helpers/util';
import {ProductDetail_Route} from '../../constants/routes';
import CacheImage from '../CacheImage/CacheImage';

const CategoryProductCard = props => {
  const {
    title,

    price,
    oldPrice,
    rating,

    handleLike,
    id,
    isLike,
    imageSrc,
    isGrid,
  } = props;

  console.log(isGrid);

  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  return (
    <DropShadow
      style={{
        width: isGrid ? width / 2 - 20 : '100%',
        // height: 300,
        marginLeft: isGrid ? (props.index % 2 !== 0 ? 15 : 0) : 0,
        shadowColor: COLORS.gray,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: !isGrid ? 0.1 : 0.06,
        shadowRadius: 5,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ProductDetail_Route, {
            product: props?.id,
          })
        }
        activeOpacity={0.98}
        style={[
          {
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius_sm,
            marginBottom: 15,
          },
          !isGrid && {
            flexDirection: 'row',
            // elevation: 8,
          },
        ]}>
        <View>
          <TouchableOpacity
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
            onPress={() => handleLike(id)}>
            {isLike ? (
              <FontAwesome name="heart" color={COLORS.primary} size={20} />
            ) : (
              <FontAwesome name="heart-o" color={COLORS.white} size={20} />
            )}
          </TouchableOpacity>
          <CacheImage
            style={[
              {
                borderRadius: SIZES.radius_sm,
                width: '100%',
                height: 160,
              },
              !isGrid && {
                width: 110,
                height: 130,
              },
            ]}
            source={{uri: props.image}}
          />
        </View>
        <View
          style={[
            {
              backgroundColor: COLORS.white,
              shadowColor: 'rgba(0,0,0,.5)',
              elevation: 5,
              borderRadius: SIZES.radius,
              position: 'relative',
              zIndex: 1,
              paddingHorizontal: 10,
              paddingBottom: 12,
              paddingTop: 15,
              marginTop: -30,
            },
            !isGrid && {
              marginTop: 0,
              flex: 1,
              paddingHorizontal: 20,
              borderRadius: 0,
              elevation: 0,
              paddingTop: 20,
              backgroundColor: 'transparent',
            },
          ]}>
          <Text
            style={{
              ...FONTS.fontSm,
              color: COLORS.dark,
              ...FONTS.fontBold,
              marginBottom: 3,
            }}
            numberOfLines={1}>
            {props?.sub_category?.name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.fontSm,
              color: COLORS.title,

              marginBottom: 5,
            }}>
            {props.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props.product_type === 'simple' && (
              <Text style={{...FONTS.font, ...FONTS.fontBold}}>
                {getPrice(props.price)}
              </Text>
            )}
            {props.product_type === 'variable' && (
              <Text style={{...FONTS.font, ...FONTS.fontBold}}>
                {getPrice(props.max_price)} - {getPrice(props.min_price)}
              </Text>
            )}
            <Text
              style={{
                ...FONTS.fontSm,
                marginBottom: 2,
                textDecorationLine: 'line-through',
              }}>
              {oldPrice}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: rating ? 8 : 0,
            }}>
            {rating && (
              <View
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
                  {props?.average_rating}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default CategoryProductCard;
