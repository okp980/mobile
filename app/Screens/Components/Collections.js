import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ShopItem from '../../components/ShopItem';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Card from '../../components/Card';

const Collections = ({products, title, subtitle, ishorinzontal = true}) => {
  const handleLike2 = id => {
    // let temp = products.map((data, index) => {
    //   if (id === data.id) {
    //     return {...data, isLike: !data.isLike};
    //   }
    //   return data;
    // });
    // setProductsData2(temp);
  };

  if (products?.length === 0) return null;
  return (
    <Card style={{marginTop: 10, padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <View style={{flex: 1}}>
          {title && (
            <Text
              style={{
                ...FONTS.fontLg,
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
        // ItemSeparatorComponent={<View style={{height: 20}} />}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1 / 2,
              flexDirection: 'column',
              margin: 3,
            }}>
            {/* <View style={styles.imageThumbnail} /> */}
            <ShopItem item={item} handleLike={handleLike2} index={index} />
          </View>
        )}
        numColumns={2}
      />
    </Card>
  );
};

export default Collections;

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    backgroundColor: 'green',
  },
});
