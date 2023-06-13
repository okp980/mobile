import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';

const OrderProductItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>
            has temporarily joined the chat
          </Text>
        </View>
        <View style={styles.productDetails}>
          <View style={styles.productMeta}>
            <View style={styles.meta}>
              <View style={styles.dot} />
              <Text style={{...FONTS.fontXs}}>Green</Text>
            </View>
          </View>
          <View>
            <Text tyle={{...FONTS.fontLg}}>(X2)</Text>
          </View>
        </View>
      </View>
      <View style={styles.price}>
        <Text style={{...FONTS.font, ...FONTS.fontBold}}>₦2,000</Text>
      </View>
    </View>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  image: {width: 70, height: 80, backgroundColor: COLORS.dark},
  info: {flex: 1, paddingHorizontal: 5},
  price: {width: 70, alignItems: 'center'},

  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.dark,
    marginRight: 5,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productMeta: {flex: 1},
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 5,
  },
});
