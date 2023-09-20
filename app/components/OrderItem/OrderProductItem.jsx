import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import {getPrice} from '../../../helpers/util';
import {useNavigation} from '@react-navigation/native';
import {Add_Review_Route} from '../../constants/routes';

const OrderProductItem = ({item, canReview}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            width: 70,
            height: 80,
            borderRadius: 2,
            marginRight: 12,
          }}
          source={{
            uri: item?.product?.image,
          }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>
            {item?.product?.name}
          </Text>
        </View>
        <View style={styles.productDetails}>
          <View style={styles.productMeta}>
            <View style={styles.meta}>
              {/* <View style={styles.dot} />  */}
              <Text style={{...FONTS.fontXs}}></Text>
            </View>
          </View>
          <View>
            <Text style={{...FONTS.fontLg}}>{`( X ${item?.quantity})`}</Text>
          </View>
        </View>
        {canReview && (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Add_Review_Route, {
                  product: item.product?.id,
                })
              }>
              <Text
                style={{
                  ...FONTS.font,
                  textDecorationLine: 'underline',
                  textDecorationColor: COLORS.dark,
                }}>
                Add Review
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.price}>
        <Text style={{...FONTS.font, ...FONTS.fontBold}}>
          {getPrice(item?.price)}
        </Text>
      </View>
    </View>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  info: {flex: 1, paddingHorizontal: 5},
  // price: {width: 70, alignItems: 'center'},

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
