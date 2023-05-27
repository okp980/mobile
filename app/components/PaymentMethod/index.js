import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const PaymentMethod = () => {
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
          Choose payment method
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          borderColor: COLORS.primary,
          borderWidth: 1,
          borderRadius: SIZES.radius_sm,
          marginBottom: 10,
        }}>
        <View style={{marginRight: 15}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 10,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS.primary,
                borderRadius: 6,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={{...FONTS.fontLg}}>Pay online</Text>
        </View>
        <View>
          <FontistoIcon name="credit-card" size={20} color={COLORS.primary} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          borderColor: COLORS.borderColor,
          borderWidth: 1,
          borderRadius: SIZES.radius_sm,
          marginBottom: 10,
        }}>
        <View style={{marginRight: 15}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 10,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                // backgroundColor: COLORS.primary,
                borderRadius: 6,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={{...FONTS.fontLg}}>Pay via Bank Transfer</Text>
        </View>
        <View>
          <FontAwesomeIcon name="bank" size={20} color={COLORS.primary} />
        </View>
      </View>
    </Card>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
