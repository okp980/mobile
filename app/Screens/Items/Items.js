import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTS} from '../../constants/theme';

import {RadioButton, Snackbar} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';

import {useEffect} from 'react';
import {useGetProductsQuery} from '../../../store/services/products';
import Root from '../../components/Root';
import Loading from '../../components/Loading/Loading';
import ErrorOccurred from '../../components/ErrorOccurred/ErrorOccurred';
import CategoryProducts from '../../components/CategoryProducts/CategoryProducts';

const Items = ({navigation, route}) => {
  const sheetRef = useRef();

  const {type, subCategoriesId, filter} = route.params;
  const [sort, setSort] = useState('');
  const [sheetType, setSheetType] = useState('');
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    navigation.setOptions({title: type});
  }, []);

  // if (isLoading) return <Loading />;
  // if (isError) return <ErrorOccurred />;

  const memoizedOptions = useMemo(
    () => (filter ? {...filter, ...{sort}} : {sort}),
    [filter, sort],
  );

  return (
    <>
      <RBSheet
        ref={sheetRef}
        height={250}
        closeOnDragDown={true}
        closeOnPressMask={true}>
        <RadioButton.Group
          onValueChange={value => {
            setSort(value);
            sheetRef.current.close();
          }}
          value={sort}>
          <RadioButton.Item
            color={COLORS.primary}
            uncheckedColor={COLORS.label}
            style={{paddingVertical: 2}}
            label="New Arrivals"
            value="+createdAt"
          />
          <RadioButton.Item
            color={COLORS.primary}
            uncheckedColor={COLORS.label}
            style={{paddingVertical: 2}}
            label="Price Low to High"
            value="-price"
          />
          <RadioButton.Item
            color={COLORS.primary}
            uncheckedColor={COLORS.label}
            style={{paddingVertical: 2}}
            label="Price High to Low"
            value="+price"
          />
          <RadioButton.Item
            color={COLORS.primary}
            uncheckedColor={COLORS.label}
            style={{paddingVertical: 2}}
            label="Top Rated"
            value="+average_rating"
          />
        </RadioButton.Group>
      </RBSheet>

      <Root noPadding>
        {/* Filter */}
        <View
          style={{
            backgroundColor: COLORS.dark,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Ripple
              onPress={() => {
                setSheetType('sort');
                sheetRef.current.open();
              }}
              style={styles.badge}>
              <Text style={{...FONTS.font, color: COLORS.white}}>Sort</Text>
              <FeatherIcon
                style={{marginLeft: 2, marginRight: -6}}
                size={18}
                name="chevron-down"
                color={COLORS.white}
              />
            </Ripple>
            <TouchableOpacity
              onPress={() => navigation.navigate('Filter', {subCategoriesId})}
              style={[
                styles.badge,
                {
                  flex: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: COLORS.gray,
                },
              ]}>
              <Text
                style={{
                  ...FONTS.fontLg,
                  color: COLORS.white,
                  textAlign: 'center',
                }}>
                Product Filter
              </Text>
            </TouchableOpacity>
            <Ripple
              onPress={() => {
                setGrid(prev => !prev);
              }}
              style={styles.badge}>
              {grid ? (
                <Ionicons
                  style={{marginLeft: 2, marginRight: -6}}
                  size={22}
                  name="grid"
                  color={COLORS.white}
                />
              ) : (
                <Ionicons
                  style={{marginLeft: 2, marginRight: -6}}
                  size={22}
                  name="list-sharp"
                  color={COLORS.white}
                />
              )}
            </Ripple>
          </View>
        </View>
        {/* Products */}
        <CategoryProducts
          params={memoizedOptions}
          subCategoriesId={subCategoriesId}
          isGrid={grid}
        />

        {/* SnackBar */}
        <Snackbar
          visible={isSnackbar}
          duration={3000}
          onDismiss={() => setIsSnackbar(false)}
          action={{
            label: 'Wishlist',
            onPress: () => {
              navigation.navigate('Wishlist');
            },
          }}>
          {snackText}
        </Snackbar>
      </Root>
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Items;
