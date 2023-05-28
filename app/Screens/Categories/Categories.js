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

const Categories = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const {data, isError, isLoading} = useGetCategoriesQuery();
  const [getSubCategories, {isError: err, isLoading: load}] =
    useLazyGetSubCategoriesQuery();
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

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

  const Item = ({title, id}) => (
    <TouchableOpacity
      onPress={() => {
        setCategory(id);
      }}>
      <View
        style={{
          height: 100,
          width: 80,
          marginRight: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderColor: category === id ? COLORS.primary : COLORS.borderColor,
            borderWidth: category === id ? 2 : 1,
            marginBottom: 10,
          }}>
          <Image />
        </View>
        <Text style={{...FONTS.fontXs, textAlign: 'center'}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <ScrollView>
        <View
          style={{
            borderBottomColor: COLORS.borderColor,
            borderBottomWidth: 1,
          }}>
          <FlatList
            data={data?.data}
            renderItem={({item}) => <Item title={item.name} id={item._id} />}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {data && (
          <ProductGrid
            products={subCategories}
            onProductClick={product =>
              navigation.navigate('Items', {type: product?.name})
            }
          />
        )}

        <Collections products={TopCollection} title="Top Sellers" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
