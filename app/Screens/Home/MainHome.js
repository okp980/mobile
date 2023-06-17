import React, {useState} from 'react';
import {
  FlatList,
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
import Ionicon from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import mobile from '../../assets/images/category/mobile.png';
import electronics from '../../assets/images/category/electronics.png';
import fashion from '../../assets/images/category/fashion.png';
import furniture from '../../assets/images/category/furniture.png';
import grocery from '../../assets/images/category/grocery.png';
import appliances from '../../assets/images/category/appliances.png';
import toys from '../../assets/images/category/toys.png';
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
import {COLORS, FONTS} from '../../constants/theme';
import Swiper from 'react-native-swiper';
import Collections from '../Components/Collections';
import {TopCollection} from './Home';
import HorizontalCollections from '../../components/HorizontalCollections.js';
import {useGetCategoriesQuery} from '../../../store/services/category';
import Card from '../../components/Card';
import {GlobalStyleSheet} from '../../constants/StyleSheet';

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

const benefits = [
  {
    name: 'buyer protection',
    icon: 'ribbon-sharp',
  },
  {
    name: 'customer benefits',
    icon: 'ribbon-sharp',
  },
  {
    name: 'fast shipping',
    icon: 'ribbon-sharp',
  },
];

const MainHome = ({navigation}) => {
  const {data, isError, isLoading} = useGetCategoriesQuery();
  const [category, setCategory] = useState('');

  const Item = ({title, id}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategory(id);
        }}>
        <View
          style={{
            height: 40,
            // width: 80,
            marginHorizontal: 10,
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              textTransform: 'uppercase',
              color: category === id ? COLORS.dark : '#8D99AE',
            }}>
            {title}
          </Text>
          {category === id && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 3,
                width: '100%',
                backgroundColor: COLORS.dark,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <StatusBar animated={true} translucent={true} />

      <ScrollView>
        <View style={{marginBottom: 10}}>
          <FlatList
            data={data?.data}
            renderItem={({item}) => <Item title={item.name} id={item._id} />}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            extraData={category}
          />
        </View>
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
        <Card
          style={{
            ...GlobalStyleSheet.container,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}>
          {benefits.map((item, index) => (
            <View key={index} style={{alignItems: 'center'}}>
              <Ionicon name={item?.icon} size={30} />
              <Text style={{...FONTS.fontSm, textTransform: 'uppercase'}}>
                {item?.name}
              </Text>
            </View>
          ))}
        </Card>
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
