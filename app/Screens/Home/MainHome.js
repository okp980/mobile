import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import mobile from '../../assets/images/category/mobile.png';
import electronics from '../../assets/images/category/electronics.png';
import fashion from '../../assets/images/category/fashion.png';
import furniture from '../../assets/images/category/furniture.png';
import grocery from '../../assets/images/category/grocery.png';
import appliances from '../../assets/images/category/appliances.png';
import toys from '../../assets/images/category/toys.png';
import bg1 from '../../assets/images/background/bg2.png';
import offer from '../../assets/images/offer/pic1.png';
import banner1 from '../../assets/images/banner/pic1.png';
import banner2 from '../../assets/images/banner/pic2.png';
import banner3 from '../../assets/images/banner/pic3.png';
import product1 from '../../assets/images/product/pic1.jpg';
import product2 from '../../assets/images/product/pic2.jpg';
import product3 from '../../assets/images/product/pic3.jpg';
import product4 from '../../assets/images/product/pic4.jpg';
import item1 from '../../assets/images/product/pic9.png';
import item2 from '../../assets/images/product/pic10.png';
import item3 from '../../assets/images/product/pic11.png';
import item4 from '../../assets/images/product/pic12.png';
import item5 from '../../assets/images/product/pic13.png';
import item6 from '../../assets/images/product/pic14.png';
import item7 from '../../assets/images/product/pic15.png';
import {COLORS, FONTS} from '../../constants/theme';
import Swiper from 'react-native-swiper';
import ProductCardStyle1 from '../../components/ProductCardStyle1';
import ProductCardStyle2 from '../../components/ProductCardStyle2';
import ProductListItem from '../../components/ProductListItem';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import StopWatch from '../../components/StopWatch';
import HomeCategories from '../Components/HomeCategories';
import FeaturedProductsSlide from '../Components/FeaturedProductsSlide';
import Collections from '../Components/Collections';
import {TopCollection} from './Home';
import HorizontalCollections from '../../components/HorizontalCollections.js';

const categoryData = [
  {
    image: mobile,
    title: 'Mobiles',
  },
  {
    image: electronics,
    title: 'Electronics',
  },
  {
    image: fashion,
    title: 'Fashion',
  },
  {
    image: furniture,
    title: 'Furniture',
  },
  {
    image: grocery,
    title: 'Grocery',
  },
  {
    image: appliances,
    title: 'Appliances',
  },
  {
    image: toys,
    title: 'Books,Toys',
  },
  {
    title: 'More',
  },
];

const bannerData = [
  {
    image: banner2,
  },
  {
    image: banner1,
  },
  {
    image: banner3,
  },
];

const SuggestData = [
  {
    image: product1,
    title: 'Peter England Causual',
    price: '1,895',
    oldPrice: '2,500',
    offer: '30% off',
  },
  {
    image: product2,
    title: 'Zip-Front Track Jacket',
    price: '₹2,599',
    oldPrice: '3,200',
    offer: '40% off',
  },
  {
    image: product3,
    title: 'Zip-Front Puffer Jacket',
    price: '₹4,059',
    oldPrice: '5,000',
    offer: '20% off',
  },
  {
    image: product4,
    title: 'Peter England Causual',
    price: '₹1,599',
    oldPrice: '2,000',
    offer: '40% off',
  },
];

const ProductData = [
  {
    type: 'Electronics',
    image: item1,
    category: 'Headphones',
    title: 'Up to 80% off',
  },
  {
    type: 'Mobiles',
    image: item2,
    category: 'Mobile phones',
    title: 'From ₹9,999',
  },
  {
    type: 'Electronics',
    image: item3,
    category: 'Laptops',
    title: 'Up to 50% off',
  },
];

const PopularItemsData = [
  {
    imagePath: item4,
    title: 'Havells Swing Fan',
    desc: '400mm , Blue tone',
    offer: '20% off',
    price: '₹1,299',
    oldPrice: '1500',
  },
  {
    imagePath: item5,
    title: 'OnePlus Nord 2T 5G',
    desc: '8GB RAM, 128GB Storage',
    offer: '50% off',
    price: '₹24,099',
    oldPrice: '30,000',
  },
  {
    imagePath: item6,
    title: 'ThinkPad L13 Yoga Gen 3',
    desc: 'Dual dore , Red tone',
    offer: '20% off',
    price: '₹85,555',
    oldPrice: '95,000',
  },
];

const MainHome = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.borderColor,
        }}>
        <IconButton
          icon={() => (
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.borderColor,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <FeatherIcon color={COLORS.title} size={18} name="menu" />
            </View>
          )}
          size={25}
          onPress={() => navigation.openDrawer()}
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
          Home
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
                  style={{...FONTS.fontXs, fontSize: 10, color: COLORS.white}}>
                  2
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View> */}
      <StatusBar animated={true} translucent={true} />
      <ScrollView>
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          height={'auto'}
          dotColor={'rgba(255,255,255,.3)'}
          activeDotColor={COLORS.white}
          paginationStyle={{bottom: 10}}>
          {bannerData.map((data, index) => {
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
                  source={data.image}
                />
              </View>
            );
          })}
        </Swiper>
        <HorizontalCollections products={TopCollection} title="New Arrivals" />
        <HorizontalCollections
          products={TopCollection}
          title="Trending Products"
        />
        <Collections products={TopCollection} title="Recommended Products" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHome;
