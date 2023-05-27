import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS} from '../../constants/theme';

const CustomInput = ({label, placeholder}) => {
  return (
    <View style={GlobalStyleSheet.inputGroup}>
      <Text style={GlobalStyleSheet.label}>{label}</Text>
      <TextInput
        style={GlobalStyleSheet.formControl}
        placeholder={placeholder}
        placeholderTextColor={COLORS.label}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
