import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {IconButton} from 'react-native-paper';

const CustomSearchHeader = ({navigation, route, ...props}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        paddingVertical: 10,
        paddingRight: 10,
      }}>
      <IconButton
        onPress={() => {}}
        size={24}
        icon={() => <Fontisto color={COLORS.white} name="search" size={22} />}
      />
      <TextInput
        style={{
          ...FONTS.font,
          flex: 1,
          color: COLORS.title,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius_xs,
          height: 50,
        }}
        autoFocus={true}
        placeholder="Search here..."
        placeholderTextColor={COLORS.text}
      />
    </View>
  );
};

export default CustomSearchHeader;

const styles = StyleSheet.create({});
