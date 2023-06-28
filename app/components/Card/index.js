import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/theme';

const Card = ({style, children}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginVertical: 5,
  },
});
