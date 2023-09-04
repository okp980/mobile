import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import Rating from '../Rating';
import {Divider} from 'react-native-paper';
import {format} from 'date-fns';

const ReviewItem = ({review}) => {
  console.log(review);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 5,
          // backgroundColor: COLORS.light,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.font, ...FONTS.fontBold, marginRight: 10}}>
            {review?.user?.email?.split('@')[0]}
          </Text>
          <Rating rating={review?.rating} />
        </View>
        <Text style={{...FONTS.fontSm}}>
          {format(new Date(review?.createdAt), 'dd-MM-yyyy')}
        </Text>
      </View>
      <Divider />
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text style={{...FONTS.font, color: COLORS.text}}>
          {review.comment}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({});
