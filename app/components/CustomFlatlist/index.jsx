import {FlatList, StyleSheet, RefreshControl, View} from 'react-native';
import React from 'react';
import Loading from '../Loading/Loading';
import {FONTS} from '../../constants/theme';
import {Text} from 'react-native';

const CustomFlatlist = ({
  loading,
  error,
  data,
  emptyMessage,
  RenderItem,
  RenderItemExtraProps,
  onRefresh,
  getMore,
  isLoadingMore,
  refreshing,
  ...rest
}) => {
  const renderFooter = () => {
    return isLoadingMore ? <Loading /> : null;
  };

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
      </View>
    );
  if (error)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            ...FONTS.font,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}>
          {error?.data?.error || 'Errror fetching Orders'}
        </Text>
      </View>
    );
  return (
    <FlatList
      data={data}
      ListEmptyComponent={
        <Text
          style={{
            ...FONTS.font,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}>
          {emptyMessage}
        </Text>
      }
      enableEmptySections={true}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <RenderItem {...{...item, index, ...RenderItemExtraProps}} />
      )}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={<View style={{height: 5, width: 5}} />}
      ListFooterComponent={renderFooter}
      onEndReached={getMore}
      onEndReachedThreshold={0.5}
      {...rest}
    />
  );
};

export default CustomFlatlist;

const styles = StyleSheet.create({});
