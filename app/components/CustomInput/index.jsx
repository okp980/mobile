import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomInput = ({label, placeholder, isPassword, error, ...props}) => {
  const [isFocused, setisFocused] = useState(false);
  const [handlePassword, setHandlePassword] = useState(false);

  return (
    <View style={GlobalStyleSheet.inputGroup}>
      <Text style={GlobalStyleSheet.label}>{label}</Text>
      {isPassword ? (
        <View>
          <TouchableOpacity
            onPress={() => setHandlePassword(!handlePassword)}
            style={{
              position: 'absolute',

              zIndex: 1,
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              right: 0,
            }}>
            {handlePassword ? (
              <FeatherIcon name="eye" color={COLORS.secondary} size={22} />
            ) : (
              <FeatherIcon name="eye-off" color={COLORS.secondary} size={22} />
            )}
          </TouchableOpacity>
          <TextInput
            style={[
              GlobalStyleSheet.formControl,
              isFocused && GlobalStyleSheet.activeInput,
            ]}
            onFocus={() => setisFocused(true)}
            onBlur={() => setisFocused(false)}
            secureTextEntry={handlePassword}
            placeholder={placeholder}
            placeholderTextColor={COLORS.label}
            {...props}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      ) : (
        <>
          <TextInput
            style={[
              GlobalStyleSheet.formControl,
              isFocused && GlobalStyleSheet.activeInput,
              props.inputStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.label}
            onFocus={() => setisFocused(true)}
            onBlur={() => setisFocused(false)}
            {...props}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  error: {
    ...FONTS.fontSm,
    color: COLORS.danger,
    marginTop: 5,
  },
});
