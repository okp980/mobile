import {StyleSheet, Text, View} from 'react-native';
import Card from '../../../components/Card';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../constants/theme';
import {Divider} from 'react-native-paper';

const ShippingMethod = () => {
  return (
    <Card>
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.dark}}>
          Shipping Information
        </Text>
      </View>
      <Divider />
      {[...Array(2).keys()].map((item, index) => (
        <>
          <View style={styles.layout} key={index}>
            <View style={styles.icon}>
              <MaterialIcon name="truck-delivery-outline" size={20} />
            </View>
            <View style={styles.details}>
              <Text
                style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.dark}}>
                Door Delivery
              </Text>
              <Text style={{...FONTS.fontSm, color: COLORS.text}}>
                Delivery time from 2-05-2023 to 12-05-2023
              </Text>
            </View>
            <View>
              <Text style={styles.price}>₦2500</Text>
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
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
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
