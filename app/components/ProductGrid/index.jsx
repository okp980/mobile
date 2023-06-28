import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductGrid = ({products, onProductClick, showMore}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginTop: 20,
      }}>
      {products.map((product, index) => {
        return (
          <View
            key={index}
            style={{
              width: '25%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                onProductClick(product);
              }}
              style={{
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  marginBottom: 6,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: 60,
                  }}
                  source={product?.image}
                />
              </View>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.title,
                  textAlign: 'center',
                }}>
                {product?.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {showMore && (
        <View
          style={{
            width: '25%',

            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onProductClick();
            }}
            style={{
              alignItems: 'center',
              marginBottom: 18,
            }}>
            <View
              style={{
                height: 60,
                width: 60,
                marginBottom: 6,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                color={COLORS.primary}
                size={40}
                name="more-horiz"
              />
            </View>
            <Text
              style={{
                ...FONTS.fontXs,
                color: COLORS.title,
              }}>
              More
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductGrid;
