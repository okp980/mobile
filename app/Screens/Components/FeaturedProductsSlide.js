import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import ProductCardStyle1 from '../../components/ProductCardStyle1';

const FeaturedProductsSlide = ({SuggestData}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 18,
          paddingBottom: 10,
        }}>
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontBold,
            color: COLORS.title,
            flex: 1,
          }}>
          Suggest for You
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Items', {type: 'Fashion'})}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.fontSm, color: COLORS.title, marginRight: 2}}>
            View all
          </Text>
          <FeatherIcon size={16} color={COLORS.title} name="chevron-right" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.borderColor,
          //   marginBottom: 25,
        }}>
        <ScrollView
          contentContainerStyle={{paddingLeft: 15}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {SuggestData.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 150,
                  marginRight: 10,
                  marginBottom: 20,
                }}>
                <ProductCardStyle1
                  onPress={() =>
                    navigation.navigate('Items', {type: 'Fashion'})
                  }
                  image={data.image}
                  title={data.title}
                  price={data.price}
                  oldPrice={data.oldPrice}
                  offer={data.offer}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FeaturedProductsSlide;

const styles = StyleSheet.create({});
