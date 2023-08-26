import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {Divider} from 'react-native-paper';
import {COLORS, FONTS} from '../../constants/theme';
import AntIcon from 'react-native-vector-icons/AntDesign';

import ReviewItem from './ReviewItem';
import Rating from '../Rating';

const Reviews = () => {
  return (
    <Card>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.fontLg, color: COLORS.dark}}>Reviews (20)</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.fontSm, color: COLORS.dark, marginRight: 5}}>
            View All
          </Text>
          <AntIcon name="right" size={10} />
        </View>
      </View>
      <Divider />

      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.font, textAlign: 'center'}}>Total Rating</Text>
          <Text
            style={{
              ...FONTS.h5,
              ...FONTS.fontBold,
              color: COLORS.dark,
              marginRight: 5,
            }}>
            4.89 / 5.00
          </Text>
        </View>
        {/* <Rating /> */}
      </View>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </Card>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
