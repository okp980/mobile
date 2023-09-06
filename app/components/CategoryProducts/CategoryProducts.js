import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useLazyGetProductsBySubCategoryQuery,
  useLazyGetProductsQuery,
} from '../../../store/services/products';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomFlatlist from '../CustomFlatlist';
import ShopItem from '../ShopItem';
import CategoryProductCard from './CategoryProductCard';
import Card from '../Card';

const CategoryProducts = ({params, subCategoriesId, isGrid}) => {
  const [products, setProducts] = useState([]);
  const route = useRoute();

  const [offSet, setOffSet] = useState(1);
  const [isListEnd, setisListEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const [getProducts] = useLazyGetProductsQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    handleGetProducts(params);
  }, [params]);

  const handleGetProducts = async params => {
    const filteredParams = {
      sub_category: route?.params.isSearch ? undefined : subCategoriesId,
      search_product: route?.params.isSearch ? route.params.type : undefined,
      ...params,
    };
    try {
      setLoading(true);
      const res = await getProducts(filteredParams).unwrap();
      setProducts(res?.data);
      console.log(res);
      setOffSet(prev => prev + 1);
      if (!res?.data?.pagination?.next) {
        setisListEnd(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error ==>', error);
      handleErrorToast({
        message: error?.data?.error || 'Errror fetching Products',
      });
    }
  };

  const handleGetMore = async () => {
    if (isListEnd || isLoadingMore) return;
    const filteredParams = {
      sub_category: route?.params.isSearch ? undefined : subCategoriesId,
      search_product: route?.params.isSearch ? route.params.type : undefined,
      ...params,
    };
    try {
      setIsLoadingMore(true);
      const res = await getProducts(filteredParams).unwrap();

      setProducts(prev => [...prev, ...res?.data]);
      setOffSet(prev => prev + 1);
      if (!res?.data?.pagination?.next) {
        setisListEnd(true);
      }
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
      setIsLoadingMore(false);
      handleErrorToast({message: 'Error fetching Products'});
    }
  };

  return (
    <Card style={{flex: 1, padding: 10}}>
      <CustomFlatlist
        error={error}
        loading={loading}
        isLoadingMore={isLoadingMore}
        RenderItem={CategoryProductCard}
        data={products}
        errorMessage="Error fetching Products"
        emptyMessage="No Products in this category"
        refreshing={loading}
        onRefresh={handleGetProducts}
        getMore={handleGetMore}
        extraData={products}
        numColumns={isGrid ? 2 : 1}
        isGrid={isGrid}
        RenderItemExtraProps={{isGrid}}
      />
    </Card>
  );
};

export default React.memo(CategoryProducts);

const styles = StyleSheet.create({});
