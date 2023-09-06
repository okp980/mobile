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

const Categories = ({navigation}) => {
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

  const Item = ({title, id, image}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategory(id);
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
              height: category === id ? 70 : 50,
              width: category === id ? 70 : 50,
              borderRadius: category === id ? 70 / 2 : 50 / 2,
              borderColor: COLORS.white,
              borderWidth: category === id ? 4 : 1,
              marginBottom: 10,
              overflow: 'hidden',
            }}>
            <CacheImage
              source={{uri: image ?? ''}}
              style={{
                height: category === id ? 70 : 50,
                width: category === id ? 70 : 50,
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
          data={data?.data}
          renderItem={({item}) => (
            <Item title={item?.name} id={item?._id} image={item?.image} />
          )}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
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
