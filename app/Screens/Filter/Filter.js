import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import {List} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import Root from '../../components/Root';
import {useGetAttributesQuery} from '../../../store/services/products';
import Loading from '../../components/Loading/Loading';
import {Items_Route} from '../../constants/routes';

const priceFilterData = [
  {
    selected: false,
    title: 'Under Rs. 499',
  },
  {
    selected: false,
    title: 'Rs. 500-699',
  },
  {
    selected: false,
    title: 'Rs. 700-999',
  },
  {
    selected: false,
    title: 'Rs. 1000-1499',
  },
  {
    selected: false,
    title: 'Rs. 1500-1999',
  },
  {
    selected: false,
    title: 'Rs. 2000 and above',
  },
];

const Filter = ({navigation, route}) => {
  const {subCategoriesId} = route.params;
  const [filter, setFilter] = useState([]);

  const [activeFilter, setActiveFilter] = useState('Price');

  const [priceFilter, setPriceFilter] = useState(priceFilterData);

  const [filterData, setFilterData] = useState(priceFilter);

  const {data, isLoading, isError, isSuccess} = useGetAttributesQuery();

  const handleFilterOption = val => {
    setActiveFilter(val);
  };

  const handleFilterSelected = value => {
    // Find the filter field from the activeFilter
    const selectedFilter = filter.find(item => item.type === activeFilter);

    // Find the filter field Index from the activeFilter
    const selectedFilterIndex = filter.findIndex(
      item => item.type === activeFilter,
    );

    if (selectedFilter) {
      // copy  the selected filter values
      let newFilteredSelectedFilterValues = [...selectedFilter.values];

      // Find selected filter value
      const selectedFilterValue = newFilteredSelectedFilterValues.find(
        item => item.name === value,
      );

      // Find index of value
      const selectedFilterValueIndex =
        newFilteredSelectedFilterValues.findIndex(item => item.name === value);

      // update the value  at the particular index
      newFilteredSelectedFilterValues.splice(selectedFilterValueIndex, 1, {
        ...selectedFilterValue,
        selected: !selectedFilterValue.selected,
      });

      // remove the selected filter from group of filters e.g Color
      let newFilter = [...filter];

      // attach new selectedFilter to new copy filter with updated selected field
      newFilter.splice(selectedFilterIndex, 1, {
        ...selectedFilter,
        values: newFilteredSelectedFilterValues,
      });

      // update filter
      setFilter(newFilter);
    }
  };

  const getFilterData = () => {
    let filteredData = filter.filter(item =>
      item.values.some(itm => itm.selected === true),
    );
    filteredData = filteredData.reduce((prevValue, currValue) => {
      const selectedValues = currValue.values
        .filter(item => item.selected)
        .map(item => item.name);
      return {...prevValue, [[currValue.type]]: selectedValues};
    }, {});
    navigation.navigate(Items_Route, {filter: filteredData, subCategoriesId});
  };

  const getFilterOptions = attributes => {
    return attributes?.map((attr, index) => ({
      type: attr.name,
      values: attr.values.map((value, index) => ({
        name: value.meta,
        selected: false,
      })),
    }));
  };

  useEffect(() => {
    const returnedFilter = getFilterOptions(data?.data);
    setFilter(returnedFilter);
  }, [isSuccess]);

  if (isLoading) return <Loading />;

  return (
    <Root noPadding>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 100,
            backgroundColor: '#eee',
          }}>
          <ScrollView>
            {filter?.map((data, index) => (
              <List.Item
                style={[
                  data?.type == activeFilter && {
                    backgroundColor: COLORS.white,
                  },
                ]}
                onPress={() => handleFilterOption(data?.type)}
                key={index}
                title={() => (
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      textTransform: 'capitalize',
                      color: COLORS.title,
                    }}>
                    {data?.type}
                  </Text>
                )}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView>
            {filter
              ?.find(item => item.type === activeFilter)
              ?.values?.map((data, index) => (
                <List.Item
                  key={index}
                  onPress={() => handleFilterSelected(data.name)}
                  left={() => (
                    <CheckBox
                      tintColors={{true: COLORS.primary, false: COLORS.text}}
                      style={{left: 10}}
                      value={data.selected}
                      disabled
                    />
                  )}
                  title={() => (
                    <Text
                      style={{
                        ...FONTS.font,
                        ...FONTS.fontMedium,
                        textTransform: 'capitalize',
                        top: -1,
                        color: COLORS.title,
                      }}>
                      {data.name}
                    </Text>
                  )}
                />
              ))}
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: COLORS.borderColor,
        }}>
        <View style={{flex: 1}}>
          <CustomButton onPress={getFilterData} btnSm title={'Apply'} />
        </View>
      </View>
    </Root>
  );
};

export default Filter;
