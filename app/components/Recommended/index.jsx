import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLazyGetRecommendedProductsQuery} from '../../../store/services/products';
import useToast from '../../../hooks/useToast';
import CustomFlatlist from '../CustomFlatlist';
import ShopItem from '../ShopItem';
import {COLORS, FONTS} from '../../constants/theme';
import Card from '../Card';
import {GlobalStyleSheet} from '../../constants/StyleSheet';

const Recommended = () => {
  const [products, setProducts] = useState([]);
  const [getRecommended] = useLazyGetRecommendedProductsQuery();
  const [offSet, setOffSet] = useState(1);
  const [isListEnd, setisListEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {handleErrorToast} = useToast();

  useEffect(() => {
    handleGetProducts();
  }, []);
  useEffect(() => {
    console.log(offSet);
    console.log('offSet changed');
  }, [offSet]);

  const handleGetProducts = async () => {
    try {
      setLoading(true);
      const res = await getRecommended().unwrap();
      setProducts(res?.data);
      setOffSet(prev => prev + 1);
      if (!res?.data?.pagination?.next) {
        setisListEnd(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('==>', error);
      handleErrorToast({message: 'Errror fetching products'});
    }
  };

  const handleGetMore = async () => {
    console.log('//////////////////////');
    if (isListEnd || isLoadingMore) return;
    try {
      setIsLoadingMore(true);
      const res = await getRecommended({page: offSet}).unwrap();

      setProducts(prev => [...prev, ...res?.data]);
      setOffSet(prev => prev + 1);
      if (!res?.data?.pagination?.next) {
        setisListEnd(true);
      }
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
      setIsLoadingMore(false);
      handleErrorToast({message: 'Errror fetching products'});
    }
  };
  return (
    <Card style={GlobalStyleSheet.container}>
      <View style={{marginVertical: 15}}>
        <Text
          style={{
            ...FONTS.fontLg,
            color: COLORS.dark,
            textTransform: 'capitalize',
          }}>
          Recommended
        </Text>
      </View>

      <CustomFlatlist
        loading={loading}
        isLoadingMore={isLoadingMore}
        numColumns={2}
        RenderItem={ShopItem}
        data={products}
        emptyMessage="No recommended products"
        refreshing={loading}
        onRefresh={handleGetProducts}
        getMore={handleGetMore}
      />
    </Card>
  );
};

export default Recommended;

const styles = StyleSheet.create({});
