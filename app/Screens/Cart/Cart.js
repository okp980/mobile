import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import CheckoutItem from '../../components/CheckoutItem';
import {COLORS, FONTS} from '../../constants/theme';

import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import Card from '../../components/Card';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collections from '../Components/Collections';
import {TopCollection} from '../Home/Home';
import {useGetCartQuery} from '../../../store/services/cart';

const Cart = ({navigation}) => {
  const {data, isLoading, isSuccess, isError} = useGetCartQuery();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{flex: 1}}>
        <ScrollView style={GlobalStyleSheet.container}>
          <Card>
            {data?.data?.products?.map((item, index) => (
              <CheckoutItem
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    product: item.product._id,
                  })
                }
                productId={item.product._id}
                key={index}
                image={item.product.image}
                title={item.product.name}
                type={item.product.sub_category.name}
                quantity={item.count}
                price={item.price}
                // oldPrice={data.oldPrice}
              />
            ))}
          </Card>

          <Card style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <MaterialIcon
                name="security"
                size={20}
                color={COLORS.primary}
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: COLORS.primary,
                }}>
                Security & Privacy
              </Text>
            </View>
            <Text style={{...FONTS.fontSm}}>
              ZURAAYA's payment processor partner stores your credit card
              details by using industry-standard data encryption technology.
              ZURAAYA will not store your actual credit card information.'
            </Text>
          </Card>
          <Collections
            products={TopCollection}
            title="You may like to fill it with"
            ishorinzontal={false}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: COLORS.borderColor,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <Text style={{...FONTS.h4}}>₦{data?.data?.total}</Text>
          <Text style={{...FONTS.fontSm}}>Saved: $15.5</Text>
        </View>
        <View style={{flex: 1}}>
          <CustomButton
            btnSm
            onPress={() => navigation.navigate('Confirm Order')}
            title={`Checkout (${data?.data?.products.length})`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
