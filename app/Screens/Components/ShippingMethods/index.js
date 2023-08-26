import {StyleSheet, Text, View} from 'react-native';
import Card from '../../../components/Card';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../constants/theme';
import {Divider} from 'react-native-paper';
import {getPrice} from '../../../../helpers/util';

const ShippingMethod = ({shippingCosts}) => {
  return (
    <Card>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>
          Shipping Information
        </Text>
      </View>
      <Divider />
      {shippingCosts?.map((item, index) => (
        <>
          <View style={styles.layout} key={index}>
            <View style={styles.icon}>
              <MaterialIcon
                name="truck-delivery-outline"
                size={20}
                color={COLORS.text}
              />
            </View>
            <View style={styles.details}>
              <Text style={{...FONTS.fontMedium, ...FONTS.fontBold}}>
                {item?.title}
              </Text>
              <Text style={{...FONTS.fontSm, color: COLORS.text}}>
                {item?.duration}
              </Text>
            </View>
            <View>
              <Text style={styles.price}>{getPrice(item?.charge)}</Text>
            </View>
          </View>
          {/* <Divider /> */}
        </>
      ))}
    </Card>
  );
};

export default ShippingMethod;

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  price: {
    ...FONTS.font,
    ...FONTS.fontBold,
    marginLeft: 10,
  },
});
