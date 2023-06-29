import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../constants/theme';
import Root from '../../components/Root';

const SearchData = [
  {
    title: 'boat earbuds',
  },
  {
    title: 'mobile phones',
  },
  {
    title: 'realme earphones',
  },
  {
    title: 'vivo t1 5g',
  },
  {
    title: 'washing machine',
  },
  {
    title: 'Air conditioner',
  },
  {
    title: 'refrigerator',
  },
  {
    title: 'neckbands wireless',
  },
  {
    title: 'home theatre',
  },
  {
    title: 'boat earbuds',
  },
];

const Search = ({navigation}) => {
  return (
    <Root>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
        }}>
        {SearchData.map((data, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Items', {type: 'Electronics'})}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              paddingVertical: 12,
            }}>
            <MaterialIcons
              size={22}
              color={COLORS.text}
              style={{
                marginRight: 12,
              }}
              name={'history'}
            />
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.font,
                ...FONTS.fontBold,
                color: COLORS.title,
                flex: 1,
              }}>
              {data.title}
            </Text>
            <FeatherIcon
              style={{opacity: 0.6}}
              color={COLORS.text}
              size={20}
              name="arrow-up-left"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Root>
  );
};

export default Search;
