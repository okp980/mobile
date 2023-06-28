import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

const sizes = ['s', 'm', 'l', 'xl'];

const colors = ['#D6F6DD', '#DAC4F7', '#F4989C', '#EBD2B4'];

const Size = ({size}) => {
  return (
    <View style={{paddingLeft: 5}}>
      <TouchableOpacity>
        <View
          style={{
            width: 40,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.borderColor,
          }}>
          <Text
            style={{
              ...FONTS.font,
              color: COLORS.gray,
              textTransform: 'uppercase',
            }}>
            {size}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const Colors = ({color}) => {
  return (
    <View
      style={{
        paddingLeft: 5,
      }}>
      <TouchableOpacity>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: COLORS.borderColor,
            backgroundColor: color,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const Sizes = () => {
  return (
    <View style={{paddingBottom: 10}}>
      {/* <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <Text
          style={{
            ...FONTS.fontLg,
            color: COLORS.dark,
          }}>
          Product Variants
        </Text>
      </View>
      <Divider /> */}
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          marginTop: 10,
          // paddingHorizontal: 10,
        }}>
        <View style={{}}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              color: COLORS.dark,
            }}>
            Sizes :
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            // marginTop: 10,
            // paddingHorizontal: 10,
          }}>
          {sizes.map((item, i) => (
            <Size size={item} key={i} />
          ))}
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text style={{...FONTS.fontSm, color: COLORS.gray}}>
              Size Guide
            </Text>
            <Ionicon name="chevron-forward" size={18} color={COLORS.gray} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          // marginTop: 10,
          // paddingHorizontal: 10,
        }}>
        <View style={{}}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              color: COLORS.dark,
            }}>
            Colors :
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 10,
          }}>
          {colors.map((item, i) => (
            <Colors color={item} key={i} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Sizes;

const styles = StyleSheet.create({});
