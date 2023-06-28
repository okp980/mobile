import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ShopItem from '../components/ShopItem';
import {COLORS, FONTS} from '../constants/theme';
import Card from './Card';

const HorizontalCollections = ({products, title, subtitle, category}) => {
  return (
    <Card style={{marginTop: 10, padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          // marginTop: 10,
        }}>
        <View style={{flex: 1}}>
          {title && (
            <Text
              style={{
                ...FONTS.fontLg,
                // ...FONTS.fontBold,
                color: COLORS.dark,
                textTransform: 'capitalize',
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
      {products?.length > 0 && (
        <FlatList
          ItemSeparatorComponent={<View style={{height: 20}} />}
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => <ShopItem item={item} />}
          horizontal
          extraData={category}
        />
      )}
      {!products ||
        (products.length === 0 && (
          <Text style={{...FONTS.font}}>No Products to display</Text>
        ))}
    </Card>
  );
};

export default HorizontalCollections;

const styles = StyleSheet.create({});
