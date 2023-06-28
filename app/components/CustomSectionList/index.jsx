import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FONTS} from '../../constants/theme';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const CustomSectionList = ({
  emptyMessage,
  RenderItem,
  ExtraRenderItemProps,
  onRefresh,
  refreshing,
}) => {
  return (
    <View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <RenderItem {...{...item, ...ExtraRenderItemProps}} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>{title}</Text>
        )}
        ListEmptyComponent={
          <Text
            style={{
              ...FONTS.font,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            {emptyMessage || 'List is Empty'}
          </Text>
        }
        // refreshControl={
        //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        // }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<View style={{width: 5}} />}
        horizontal
      />
    </View>
  );
};

export default CustomSectionList;

const styles = StyleSheet.create({});
