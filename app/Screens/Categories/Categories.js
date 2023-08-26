import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

import {
  useGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from '../../../store/services/category';
import ProductGrid from '../../components/ProductGrid';

import {TopCollection} from '../Home/Home';
import Collections from '../Components/Collections';
import {useState} from 'react';
import Root from '../../components/Root';

const Categories = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const {data, isError, isLoading} = useGetCategoriesQuery();
  const [getSubCategories, {isError: err, isLoading: load}] =
    useLazyGetSubCategoriesQuery();
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  console.log(data);

  useEffect(() => {
    setCategory(data?.data[0]._id);
  }, [data?.data]);

  useEffect(() => {
    handleGetSubCategories();
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
    console.log('image url', image);
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
            <Image
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
              ...FONTS.fontXs,
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
      <ScrollView>
        {data && (
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

        {/* <Collections products={TopCollection} title="Top Sellers" /> */}
      </ScrollView>
    </Root>
  );
};

export default Categories;
