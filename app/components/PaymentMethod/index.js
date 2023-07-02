import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const PaymentMethod = ({methods, onSelectMethod}) => {
  return (
    <View style={GlobalStyleSheet.container}>
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
      {methods?.map((method, index) => (
        <TouchableOpacity
          onPress={() => onSelectMethod(method?.id)}
          key={index}>
          <Card
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              borderColor: method?.selected
                ? COLORS.primary
                : COLORS.borderColor,
              borderWidth: 1,
              borderRadius: SIZES.radius_sm,
              // marginBottom: 10,
            }}>
            <View style={{marginRight: 15}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderColor: method?.selected
                    ? COLORS.primary
                    : COLORS.borderColor,
                  borderWidth: 1,
                  borderRadius: 10,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: method?.selected
                      ? COLORS.primary
                      : COLORS.white,
                    borderRadius: 6,
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <Text style={{...FONTS.fontLg}}>{method?.name}</Text>
            </View>
            <View>
              {index === 0 ? (
                <FontistoIcon
                  name="credit-card"
                  size={20}
                  color={method?.selected ? COLORS.primary : COLORS.dark}
                />
              ) : (
                <FontAwesomeIcon
                  name="bank"
                  size={20}
                  color={method?.selected ? COLORS.primary : COLORS.dark}
                />
              )}
            </View>
          </Card>
        </TouchableOpacity>
      ))}
      {/* <Card
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
        <View></View>
      </Card> */}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
