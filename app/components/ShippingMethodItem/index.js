import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';

const ShippingMethodItem = () => {
  return (
    <Card style={GlobalStyleSheet.container}>
      <View
        style={{
          paddingBottom: 10,
          marginBottom: 10,
        }}>
        <Text
          style={{
            ...FONTS.fontLg,
            ...FONTS.fontBold,
            color: COLORS.title,
          }}>
          Shipping Methods
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View>
          <View
            style={{
              width: 20,
              height: 20,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: 'black',
                borderRadius: 6,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={{...FONTS.fontBold}}>Door Delivery</Text>
          <Text style={{...FONTS.font}}>Delivery is within 24 to 48 hours</Text>
        </View>
        <View>
          <Text
            style={{
              ...FONTS.fontLg,
              ...FONTS.fontBold,
              color: COLORS.dark,
            }}>
            $2000
          </Text>
        </View>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View>
          <View
            style={{
              width: 20,
              height: 20,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 12,
                height: 12,

                borderRadius: 6,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={{...FONTS.fontBold}}>Pick up Station</Text>
          <Text style={{...FONTS.font}}>Delivery is within 24 to 48 hours</Text>
        </View>
        <View>
          <Text
            style={{
              ...FONTS.fontLg,
              ...FONTS.fontBold,
              color: COLORS.dark,
            }}>
            $1000
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default ShippingMethodItem;

const styles = StyleSheet.create({});
