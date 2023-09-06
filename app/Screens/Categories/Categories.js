import React, {useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

import {
  useGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from '../../../store/services/category';
import ProductGrid from '../../components/ProductGrid';
import {useState} from 'react';
import Root from '../../components/Root';
import VirtualizedView from '../../components/VirtualizedView/VirtualizedView';
import Card from '../../components/Card';
import Loading from '../../components/Loading/Loading';
import CacheImage from '../../components/CacheImage/CacheImage';
import {useRef} from 'react';

const Categories = ({navigation}) => {
  const categoryRef = useRef();
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);
  const [category, setCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const {data, isError, isLoading} = useGetCategoriesQuery();
  const [getSubCategories, {isError: err, isLoading: load}] =
    useLazyGetSubCategoriesQuery({skip: category.trim().length === 0});
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  useEffect(() => {
    setCategory(data?.data[0]._id);
  }, [data?.data]);

  useEffect(() => {
    categoryRef?.current.scrollToIndex({
      index: categoryStartIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [categoryStartIndex]);

  useEffect(() => {
    if (category) {
      handleGetSubCategories();
    }
  }, [category]);

  const handleGetSubCategories = async () => {
    try {
      setLoadingSubCategories(true);
      const sub = await getSubCategories(category).unwrap();
      setSubCategories(sub?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  const Item = ({title, id, image, categoryStartIndex, itemIndex}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategoryStartIndex(itemIndex);
        }}>
        <View
          style={{
            height: 120,
            width: 80,
            marginRight: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: categoryStartIndex === itemIndex ? 70 : 50,
              width: categoryStartIndex === itemIndex ? 70 : 50,
              borderRadius: categoryStartIndex === itemIndex ? 70 / 2 : 50 / 2,
              borderColor: COLORS.white,
              borderWidth: categoryStartIndex === itemIndex ? 4 : 1,
              marginBottom: 10,
              overflow: 'hidden',
            }}>
            <CacheImage
              source={{uri: image ?? ''}}
              style={{
                height: categoryStartIndex === itemIndex ? 70 : 50,
                width: categoryStartIndex === itemIndex ? 70 : 50,
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              ...FONTS.fontSm,
              textAlign: 'center',
              color: COLORS.white,
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Root noPadding>
      <View
        style={{
          borderBottomColor: COLORS.borderColor,
          borderBottomWidth: 1,
          padding: 10,
          backgroundColor: COLORS.primary,
          marginBottom: 20,
        }}>
        <FlatList
          ref={categoryRef}
          initialScrollIndex={categoryStartIndex}
          data={data?.data}
          renderItem={({item, index}) => (
            <Item
              title={item?.name}
              id={item?._id}
              image={item?.image}
              categoryStartIndex={categoryStartIndex}
              itemIndex={index}
            />
          )}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              categoryRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
                viewPosition: 0.5,
              });
            });
          }}
        />
      </View>

      <VirtualizedView>
        <Card style={{paddingVertical: 20, marginHorizontal: 10}}>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 20,
              ...FONTS.font,
              ...FONTS.fontBold,
            }}>
            Sub-Categories
          </Text>
          {loadingSubCategories && <Loading />}
          {data && !loadingSubCategories && (
            <ProductGrid
              products={subCategories}
              onProductClick={item =>
                navigation.navigate('Items', {
                  type: item?.name,
                  subCategoriesId: item._id,
                })
              }
            />
          )}
        </Card>
      </VirtualizedView>
    </Root>
  );
};

export default Categories;
