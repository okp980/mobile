import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../constants/theme';
import CustomButton from '../CustomButton';

const ErrorOccurred = ({caption = 'error occurred', isConnected}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <MaterialIcons name="error-outline" size={70} color={COLORS.danger} />
      <Text
        style={{
          ...FONTS.font,
          textTransform: 'capitalize',
          marginVertical: 20,
          color: COLORS.gray,
        }}>
        {isConnected ? caption : 'please connect to a network'}
      </Text>
      <CustomButton title="Try Again" color={COLORS.dark} btnSm />
    </View>
  );
};

export default ErrorOccurred;

const styles = StyleSheet.create({});
