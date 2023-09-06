import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation, useRoute} from '@react-navigation/native';

const CustomSearchHeader = ({searchWord, onChangeSearch}) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        paddingVertical: 10,
        paddingRight: 10,
      }}>
      <Fontisto
        color={COLORS.white}
        name="search"
        size={22}
        style={{marginRight: 15, paddingLeft: 10}}
      />
      <TextInput
        style={{
          ...FONTS.font,
          flex: 1,
          color: COLORS.title,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius_xs,
          height: 40,
        }}
        autoFocus={true}
        placeholder="Search here..."
        placeholderTextColor={COLORS.text}
        value={searchWord}
        onChangeText={onChangeSearch}
      />
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          marginLeft: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.fontLg, color: COLORS.white}}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearchHeader;

const styles = StyleSheet.create({});
