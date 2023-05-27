import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';

const ProductMeasure = () => {
  return (
    <Card>
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text style={{...FONTS.fontLg, color: COLORS.dark, marginBottom: 2}}>
          Product Measurement
        </Text>
      </View>
      <Divider />
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text style={{...FONTS.font, color: COLORS.text}}>Length: 5.8inch</Text>
      </View>
    </Card>
  );
};

export default ProductMeasure;

const styles = StyleSheet.create({});
