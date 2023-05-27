import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import Rating from '../Rating';
import {Divider} from 'react-native-paper';

const ReviewItem = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 15,
          backgroundColor: COLORS.dark,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{...FONTS.fontSm, color: COLORS.white, marginRight: 10}}>
            John
          </Text>
          <Rating />
        </View>
        <Text style={{...FONTS.fontXs, color: COLORS.white}}>2/05/2022</Text>
      </View>
      <Divider />
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text style={{...FONTS.fontSm, color: COLORS.text}}>
          Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor
          incididunt ut labore et...
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({});
