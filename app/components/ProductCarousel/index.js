import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ProductCarousel = () => {
  return (
    <View>
      <View style={{paddingHorizontal: 20}}>
        <Text
          style={{
            ...FONTS.fontLg,
            color: COLORS.dark,
            textTransform: 'uppercase',
          }}>
          You may also like
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{margin: 20}}
        ItemSeparatorComponent={<View style={{width: 20}} />}
      />
    </View>
  );
};

export default ProductCarousel;

const styles = StyleSheet.create({});
