import React, {useEffect, useState} from 'react';
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

import LinearGradient from 'react-native-linear-gradient';

import banner1 from '../../assets/images/banner/pic1.png';
import banner2 from '../../assets/images/banner/pic2.png';
import banner3 from '../../assets/images/banner/pic3.png';

import {COLORS, FONTS} from '../../constants/theme';
import Swiper from 'react-native-swiper';
import Collections from '../Components/Collections';
import HorizontalCollections from '../../components/HorizontalCollections.js';
import {useLazyGetCategoriesQuery} from '../../../store/services/category';
import {
  useLazyGetNewArrivalsQuery,
  useLazyGetRecommendedProductsQuery,
  useLazyGetTrendingProductsQuery,
} from '../../../store/services/products';
import Loading from '../../components/Loading/Loading';
import ErrorOccurred from '../../components/ErrorOccurred/ErrorOccurred';
import useNetwork from '../../../hooks/useNetwork';
import Recommended from '../../components/Recommended';
import Root from '../../components/Root';
import VirtualizedView from '../../components/VirtualizedView/VirtualizedView';

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

const MainHome = ({navigation}) => {
  const [categoriesTab, setCategoriesTab] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);

  // products
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const {isConnected} = useNetwork();

  const [getAllCategories, {isError, isLoading, error}] =
    useLazyGetCategoriesQuery();
  const [getNewArrivals] = useLazyGetNewArrivalsQuery();
  const [getTrending] = useLazyGetTrendingProductsQuery();
  const [getRecommended] = useLazyGetRecommendedProductsQuery();

  useEffect(() => {
    getAllCategories()
      .unwrap()
      .then(response => {
        let categories = [{name: 'all', id: Math.random()}];
        categories = [...categories, ...response?.data];
        setCategoriesTab(categories);
        setCategory(categories[0]);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const handleFetchProducts = async () => {
      const categoryParam =
        category?.name?.toLowerCase() === 'all' ? {} : {category: category?.id};
      try {
        setLoading(true);
        const newRes = await getNewArrivals(categoryParam).unwrap();
        const trendinRes = await getTrending(categoryParam).unwrap();
        const recommendedRes = await getRecommended(categoryParam).unwrap();

        setNewArrivals(newRes?.data?.data);
        setTrending(trendinRes?.data?.data);
        setRecommended(recommendedRes?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleFetchProducts();
  }, [category]);

  const Item = ({categoryItem}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategory(categoryItem);
        }}>
        <View
          style={{
            height: 40,
            marginHorizontal: 10,
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              textTransform: 'uppercase',
              color:
                categoryItem?.id === category?.id ? COLORS.white : COLORS.white,
            }}>
            {categoryItem?.name}
          </Text>
          {categoryItem?.id === category?.id && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 3,
                width: '100%',
                backgroundColor: COLORS.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <Root>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading size="large" />
        </View>
      </Root>
    );
  }
  if (isError) {
    return (
      <Root>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ErrorOccurred
            isConnected={isConnected}
            caption={error?.data?.error}
          />
        </View>
      </Root>
    );
  }
  return (
    <Root noPadding>
      <View style={{backgroundColor: COLORS.primary, paddingBottom: 5}}>
        <FlatList
          data={categoriesTab}
          renderItem={({item}) => <Item categoryItem={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={category}
        />
      </View>
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loading size="large" />
          </View>
        ) : (
          <VirtualizedView>
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

            <HorizontalCollections
              products={newArrivals}
              title="New Arrivals"
              category={category}
            />
            <HorizontalCollections
              products={trending}
              title="Trending Products"
              category={category}
            />
            <Collections products={recommended} title="Recommended Products" />
            {/* <Recommended /> */}
          </VirtualizedView>
        )}
      </View>
    </Root>
  );
};

export default MainHome;
