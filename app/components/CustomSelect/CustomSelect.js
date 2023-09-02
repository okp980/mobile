import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import SelectDropdown from 'react-native-select-dropdown';
import {ErrorMessage} from 'formik';
import {COLORS, FONTS} from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomSelect = ({error, label, ...props}) => {
  const [isFocused, setisFocused] = useState(false);
  return (
    <View style={GlobalStyleSheet.inputGroup}>
      <Text style={GlobalStyleSheet.label}>{label}</Text>
      <SelectDropdown
        buttonStyle={[
          GlobalStyleSheet.formControl,
          isFocused && GlobalStyleSheet.activeInput,
          {width: '100%', textAlign: 'left'},
        ]}
        buttonTextStyle={{...FONTS.font}}
        renderDropdownIcon={() => (
          <Ionicons
            name="chevron-down-outline"
            size={25}
            color={COLORS.label}
          />
        )}
        rowTextStyle={{
          ...FONTS.font,
        }}
        rowStyle={{
          borderBottomColor: COLORS.label,
          width: '100%',
        }}
        dropdownStyle={{
          backgroundColor: COLORS.white,
          borderRadius: 8,
          margin: 0,
        }}
        selectedRowStyle={{backgroundColor: COLORS.gray}}
        selectedRowTextStyle={{color: COLORS.white}}
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  error: {
    ...FONTS.fontSm,
    color: COLORS.danger,
    marginTop: 5,
  },
});
