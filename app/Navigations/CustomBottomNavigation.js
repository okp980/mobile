import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS} from '../constants/theme';

const CustomBottomNavigation = ({state, descriptors, navigation}) => {
  return (
    <View
      style={{
        height: 70,
        borderTopWidth: 1,
        borderColor: COLORS.borderColor,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        paddingVertical: 4,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
          //   activeTab();
        };

        return (
          <View
            key={index}
            style={{
              width: '20%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                alignItems: 'center',
                paddingVertical: 9,
              }}>
              <Ionicons
                size={20}
                style={{
                  marginBottom: 5,
                  color: isFocused ? COLORS.primary : COLORS.title,
                }}
                name={
                  label == 'Home'
                    ? 'home-sharp'
                    : label == 'Category'
                    ? 'grid-sharp'
                    : label == 'Messages'
                    ? 'chatbox-sharp'
                    : label == 'Account'
                    ? 'person-sharp'
                    : label == 'Cart' && 'ios-cart-sharp'
                }
              />
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: isFocused ? COLORS.primary : COLORS.text,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default CustomBottomNavigation;
