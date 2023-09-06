import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Items_Route} from '../../constants/routes';
import {COLORS, FONTS} from '../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SEARCH_RESULTS_STORAGE} from '../../constants/reusables';

const SearchItem = ({name, isStoredSearch}) => {
  const navigation = useNavigation();

  const handleSearchPress = async () => {
    try {
      let search_results = [];
      navigation.navigate(Items_Route, {type: name, isSearch: true});
      const value = await AsyncStorage.getItem(SEARCH_RESULTS_STORAGE);
      if (value !== null) {
        search_results = JSON.parse(value);
      }
      const alreadyExits = search_results.find(item => item === name);
      if (alreadyExits) {
        return;
      }
      search_results = [name, ...search_results];
      await AsyncStorage.setItem(
        SEARCH_RESULTS_STORAGE,
        JSON.stringify(search_results),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={handleSearchPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',

        padding: 12,
      }}>
      {isStoredSearch && (
        <MaterialIcons
          size={15}
          color={COLORS.text}
          style={{
            marginRight: 12,
          }}
          name={'history'}
        />
      )}
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.font,
          ...FONTS.fontBold,
          color: COLORS.title,
          flex: 1,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = StyleSheet.create({});
