import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ProductCardStyle2 from '../../components/ProductCardStyle2';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import FashionData from '../../JSON/Fashion.json';
import MobilesData from '../../JSON/Mobiles.json';
import FurnitureData from '../../JSON/Furniture.json';
import ElectronicsData from '../../JSON/Electronics.json';
import GroceryData from '../../JSON/Grocery.json';
import AppliancesData from '../../JSON/Appliances.json';
import BookToysData from '../../JSON/BooksToys.json';
import ProductListItem from '../../components/ProductListItem';
import ProductGrid from '../../components/ProductGrid';
import {useGetSubCategoriesQuery} from '../../../store/services/category';

const CategoryHome = ({navigation, route}) => {
  const {title, productId} = route.params;
  console.log(productId, 'in here');

  const {data, isLoading, isError} = useGetSubCategoriesQuery(productId);
  console.log('data is...', data);
  console.log('error is...', isError);

  console.log(productId);
  const pageData =
    title === 'Beauty & Hair'
      ? FashionData
      : title === 'Mobiles'
      ? MobilesData
      : title === 'Electronics'
      ? ElectronicsData
      : title === 'Computer & Accessories'
      ? FurnitureData
      : title === 'Grocery'
      ? GroceryData
      : title === 'Appliances'
      ? AppliancesData
      : title === 'Books,Toys'
      ? BookToysData
      : [];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.borderColor,
        }}>
        <IconButton
          icon={() => (
            <FeatherIcon color={COLORS.title} size={18} name="arrow-left" />
          )}
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontBold,
            color: COLORS.title,
            flex: 1,
            bottom: 1,
            marginLeft: 5,
          }}>
          {title}
        </Text>
        <IconButton
          icon={() => (
            <FeatherIcon color={COLORS.title} size={20} name="search" />
          )}
          size={25}
          onPress={() => navigation.navigate('Search')}
        />
        <IconButton
          icon={() => (
            <FeatherIcon color={COLORS.title} size={20} name="heart" />
          )}
          size={25}
          onPress={() => navigation.navigate('Wishlist')}
        />
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          icon={() => (
            <View>
              <FeatherIcon
                color={COLORS.title}
                size={20}
                name="shopping-cart"
              />
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 14,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -4,
                  right: -6,
                }}>
                <Text
                  style={{
                    ...FONTS.fontXs,
                    fontSize: 10,
                    color: COLORS.white,
                  }}>
                  2
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {pageData.slider && (
          <Swiper
            autoplay={true}
            autoplayTimeout={6}
            height={'auto'}
            dotColor={'rgba(255,255,255,.3)'}
            activeDotColor={COLORS.white}
            paginationStyle={{bottom: 10}}>
            {pageData.slider.map((data, index) => {
              return (
                <View key={index}>
                  <LinearGradient
                    colors={['transparent', 'transparent', 'rgba(0,0,0,.4)']}
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      zIndex: 1,
                    }}></LinearGradient>
                  <Image
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 250 / 100,
                    }}
                    source={{uri: data.image}}
                  />
                </View>
              );
            })}
          </Swiper>
        )}

        {data && (
          <ProductGrid
            products={data?.data}
            onProductClick={product =>
              navigation.navigate('Items', {type: product?.name})
            }
          />
        )}

        {pageData.sale &&
          pageData.sale.map((data, index) => {
            return (
              <View key={index} style={GlobalStyleSheet.container}>
                <Text style={{...FONTS.h6, marginBottom: 8}}>{data.title}</Text>
                <View style={{marginHorizontal: -15}}>
                  <ScrollView
                    contentContainerStyle={{paddingLeft: 15}}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {data.items &&
                      data.items.map((data, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              width: 150,
                              marginRight: 10,
                            }}>
                            <ProductCardStyle2
                              onPress={() =>
                                navigation.navigate('Items', {type: title})
                              }
                              imageUrl={data.image}
                              category={data.title}
                              title={data.offer}
                            />
                          </View>
                        );
                      })}
                  </ScrollView>
                </View>
              </View>
            );
          })}

        {/* {pageData.recentViewItems && (
          <>
            <View
              style={{
                ...GlobalStyleSheet.container,
                paddingBottom: 4,
                borderTopWidth: 1,
                borderTopColor: COLORS.borderColor,
              }}>
              <Text style={{...FONTS.h6}}>Recent Viewed Items</Text>
            </View>
            {pageData.recentViewItems.map((data, index) => (
              <ProductListItem
                onPress={() => navigation.navigate('Items', {type: title})}
                key={index}
                imageUrl={data.image}
                title={data.title}
                desc={data.desc}
                price={data.price}
                oldPrice={data.oldPrice}
                offer={data.offer}
              />
            ))}
          </>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryHome;
