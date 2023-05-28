import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ShopItem from '../components/ShopItem';
import {COLORS, FONTS} from '../constants/theme';
import {GlobalStyleSheet} from '../constants/StyleSheet';

const HorizontalCollections = ({products, title, subtitle}) => {
  return (
    <View style={{marginTop: 10, paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <View style={{flex: 1}}>
          {title && (
            <Text
              style={{
                ...FONTS.h5,
                ...FONTS.fontBold,
                color: COLORS.dark,
                textTransform: 'uppercase',
              }}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={{
                ...FONTS.font,
                color: COLORS.dark,
                textTransform: 'capitalize',
              }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <FlatList
        ItemSeparatorComponent={<View style={{height: 20}} />}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => <ShopItem item={item} />}
        horizontal
      />
    </View>
  );
};

export default HorizontalCollections;

const styles = StyleSheet.create({});
