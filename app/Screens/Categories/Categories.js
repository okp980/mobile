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
import {useRef} from 'react';
import CategoryItem from './CategoryItem';

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

  return (
    <Root noPadding>
      <View
        style={{
          borderBottomColor: COLORS.borderColor,
          borderBottomWidth: 1,
          // padding: 10,
          backgroundColor: COLORS.primary,
          marginBottom: 20,
        }}>
        <FlatList
          ref={categoryRef}
          initialScrollIndex={categoryStartIndex}
          data={data?.data}
          renderItem={({item, index}) => (
            <CategoryItem
              title={item?.name}
              id={item?._id}
              image={item?.image}
              categoryStartIndex={categoryStartIndex}
              itemIndex={index}
              setCategoryStartIndex={setCategoryStartIndex}
              setCategory={setCategory}
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
