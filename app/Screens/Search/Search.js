import React, {useEffect, useState} from 'react';

import Root from '../../components/Root';
import {useGetSearchProductsQuery} from '../../../store/services/products';
import SearchItem from './SearchItem';
import CustomSearchHeader from '../../Navigations/Header/CustomSearchHeader';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SEARCH_RESULTS_STORAGE} from '../../constants/reusables';

const Search = ({navigation, route}) => {
  const [searchWord, setSearchWord] = useState('');
  const [storedSearch, setStoredSearch] = useState([]);
  const {data} = useGetSearchProductsQuery(searchWord, {
    skip: searchWord.trim().length === 0,
  });

  useEffect(() => {
    handleStoredSearch();
  }, [searchWord]);

  const handleStoredSearch = async () => {
    try {
      const value = await AsyncStorage.getItem(SEARCH_RESULTS_STORAGE);
      if (value !== null) {
        const search_results = JSON.parse(value);
        setStoredSearch(search_results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Root noPadding>
      <CustomSearchHeader
        searchWord={searchWord}
        onChangeSearch={setSearchWord}
      />
      {searchWord.trim().length > 0 && (
        <FlatList
          data={data?.data}
          renderItem={({item}) => <SearchItem name={item?.name} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          extraData={searchWord}
        />
      )}
      {searchWord.trim().length === 0 && (
        <FlatList
          data={storedSearch}
          renderItem={({item}) => <SearchItem name={item} isStoredSearch />}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Root>
  );
};

export default Search;
