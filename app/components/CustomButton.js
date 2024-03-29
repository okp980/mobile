import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, SIZES} from '../constants/theme';

const CustomButton = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled || props.loading}
      activeOpacity={0.75}
      style={[
        {...styles.button},
        props.btnSm && {height: 40},
        props.color && {backgroundColor: props.color},
        props.btnLight && {backgroundColor: '#E6E6E6', elevation: 0},
        props.disabled && {backgroundColor: '#C9C9C9', elevation: 0},
        props.outline && {
          backgroundColor: 'transparent',
          elevation: 0,
          borderWidth: 1,
          borderColor: COLORS.primary,
        },
        props.customStyles,
      ]}
      onPress={() => (props.onPress ? props.onPress() : '')}>
      {!props.loading && (
        <>
          {props.icon ? (
            <View
              style={{
                position: 'absolute',
                left: 20,
              }}>
              {props.icon}
            </View>
          ) : null}

          <Text
            style={[
              {...FONTS.fontLg, color: COLORS.white},
              props.btnLight && {color: '#646464'},
              props.textColor && {color: props.textColor},
              props.outline && !props.textColor && {color: COLORS.primary},
            ]}>
            {props.title}
          </Text>
        </>
      )}
      {props.loading && <ActivityIndicator size={15} color={COLORS.white} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: SIZES.radius_xs,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
  },
});

export default CustomButton;
