import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS} from '../../constants/theme';
import {useGetCategoriesQuery} from '../../../store/services/category';
import ProductGrid from '../../components/ProductGrid';

const HomeCategories = () => {
  const {data, isError, isLoading} = useGetCategoriesQuery();
  const navigation = useNavigation();
  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            ...FONTS.font,
            color: COLORS.title,
          }}>
          Loading...
        </Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            ...FONTS.font,
            color: COLORS.danger,
          }}>
          Error fetching categories, Please refresh...
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      <ProductGrid
        products={data?.data?.slice(0, 7)}
        onProductClick={() => navigation.navigate('Category')}
        showMore
      />
    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({});
