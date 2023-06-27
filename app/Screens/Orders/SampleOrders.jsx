import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLazyGetOrdersQuery} from '../../../store/services/order';
import useToast from '../../../hooks/useToast';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import CustomFlatlist from '../../components/CustomFlatlist';
import OrderItem from '../../components/OrderItem';
import Card from '../../components/Card';
import {useNavigation} from '@react-navigation/native';
import {Orders_Route, Sign_In} from '../../constants/routes';

const SampleOrders = () => {
  const [Orders, setOrders] = useState([]);
  const [getOrders, {error}] = useLazyGetOrdersQuery();
  const [offSet, setOffSet] = useState(1);
  const [isListEnd, setisListEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigation = useNavigation();

  const {handleErrorToast} = useToast();

  useEffect(() => {
    handleGetOrders();
  }, []);
  useEffect(() => {
    console.log(offSet);
    console.log('offSet changed');
  }, [offSet]);

  const handleGetOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders().unwrap();
      setOrders(res?.data);
      setOffSet(prev => prev + 1);
      if (!res?.data?.pagination?.next) {
        setisListEnd(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('==>', error);
      handleErrorToast({
        message: error?.data?.error || 'Errror fetching Orders',
      });
      if (error?.status === 401) {
        navigation.navigate(Sign_In, {from: Orders_Route});
      }
    }
  };

  const handleGetMore = async () => {
    if (isListEnd || isLoadingMore) return;
    try {
      setIsLoadingMore(true);
      const res = await getOrders({page: offSet}).unwrap();

      setOrders(prev => [...prev, ...res?.data]);
      setOffSet(prev => prev + 1);
      if (!res?.data?.pagination?.next) {
        setisListEnd(true);
      }
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
      setIsLoadingMore(false);
      handleErrorToast({message: 'Errror fetching Orders'});
    }
  };
  return (
    <Card style={GlobalStyleSheet.container}>
      <CustomFlatlist
        error={error}
        loading={loading}
        isLoadingMore={isLoadingMore}
        RenderItem={OrderItem}
        data={Orders}
        emptyMessage="No Orders"
        refreshing={loading}
        onRefresh={handleGetOrders}
        getMore={handleGetMore}
        extraData={Orders}
      />
    </Card>
  );
};

export default SampleOrders;

const styles = StyleSheet.create({});
