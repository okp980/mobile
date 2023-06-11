import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';

const ShippingMethodItem = ({methods, onSelectMethod}) => {
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
      {methods?.map((item, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => onSelectMethod(item?.id)}>
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
                      backgroundColor: item?.selected
                        ? COLORS.dark
                        : COLORS.white,
                      borderRadius: 6,
                    }}
                  />
                </View>
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{...FONTS.fontBold}}>{item?.title}</Text>
                <Text style={{...FONTS.font}}>{item?.description}</Text>
              </View>
              <View>
                <Text
                  style={{
                    ...FONTS.fontLg,
                    ...FONTS.fontBold,
                    color: COLORS.dark,
                  }}>
                  ₦{item?.amount}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {index !== methods.length - 1 && <Divider />}
        </View>
      ))}
    </Card>
  );
};

export default ShippingMethodItem;

const styles = StyleSheet.create({});
