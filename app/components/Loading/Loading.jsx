import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS, FONTS} from '../../constants/theme';

const Loading = ({caption, size = 'small', color = COLORS.dark}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={color} size={size} />
      {caption && (
        <Text style={{...FONTS.fontLg, marginTop: 10}}>{caption}</Text>
      )}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
