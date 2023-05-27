import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';

const Sizes = () => {
  return (
    <Card>
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <Text
          style={{
            ...FONTS.fontLg,
            color: COLORS.dark,
          }}>
          Sizes
        </Text>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: COLORS.text,
            marginRight: 5,
          }}>
          <Text style={{...FONTS.fontSm, color: COLORS.text}}>XXL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: COLORS.text,
            marginRight: 5,
          }}>
          <Text style={{...FONTS.fontSm, color: COLORS.text}}>XS</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default Sizes;

const styles = StyleSheet.create({});
