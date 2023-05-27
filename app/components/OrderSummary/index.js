import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Card from '../Card';
import {Divider} from 'react-native-paper';

const OrderSummary = () => {
  return (
    <>
      <Card style={{...GlobalStyleSheet.container, backgroundColor: '#E6E6EA'}}>
        <Text style={{...FONTS.fontLg, ...FONTS.fontBold, color: COLORS.title}}>
          Order Summary
        </Text>
        <Divider style={{marginVertical: 10}} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{height: 80, width: 60, backgroundColor: COLORS.dark}} />
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text
              style={{
                ...FONTS.fontLg,
                ...FONTS.fontBold,
                color: COLORS.dark,
                marginBottom: 5,
              }}>
              BASMA (x2)
            </Text>
            <Text style={{...FONTS.fontXs}}>
              Color:Red-Wine, Lens-Type:Photochromic With Anti Blue Light(for
              Sun And Digital Screens)
            </Text>
          </View>
          <View style={{paddingHorizontal: 5}}>
            <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>$2000</Text>
          </View>
        </View>
      </Card>
      <Card style={{...GlobalStyleSheet.container, backgroundColor: '#E6E6EA'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{...FONTS.font}}>Retail Price:</Text>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>$22.00</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{...FONTS.font}}>Shipping fee:</Text>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>$22.00</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{...FONTS.font}}>Shipping Guarantee:</Text>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>$22.00</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={{...FONTS.font}}>Discount:</Text>
            <Text style={{...FONTS.fontXs}}>(Coupon Code:[she30])</Text>
          </View>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>$22.00</Text>
        </View>
        <Divider style={{marginVertical: 10}} />
        {/* total */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={{...FONTS.h4, ...FONTS.fontBold}}>SUB-TOTAL</Text>
          </View>
          <Text style={{...FONTS.h5, ...FONTS.fontBold}}>$2200.00</Text>
        </View>
      </Card>
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({});
