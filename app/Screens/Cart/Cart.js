import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import CheckoutItem from '../../components/CheckoutItem';
import {COLORS, FONTS} from '../../constants/theme';
import CustomButton from '../../components/CustomButton';
import Card from '../../components/Card';
import Collections from '../Components/Collections';
import {useGetCartQuery} from '../../../store/services/cart';
import {useGetProductsQuery} from '../../../store/services/products';
import Icon from 'react-native-vector-icons/Zocial';
import Root from '../../components/Root';
import {getPrice} from '../../../helpers/util';
import VirtualizedView from '../../components/VirtualizedView/VirtualizedView';

const Cart = ({navigation}) => {
  const {data, isLoading, isSuccess, isError} = useGetCartQuery();
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productError,
  } = useGetProductsQuery(undefined);

  return (
    <Root>
      <ScrollView>
        {data?.data === null && isSuccess ? (
          <Card style={{alignItems: 'center', paddingVertical: 30}}>
            <Icon
              name="cart"
              size={70}
              color={COLORS.dark}
              style={{paddingHorizontal: 20}}
            />
            <Text style={{...FONTS.fontLg}}>Your Cart is empty</Text>
          </Card>
        ) : (
          <Card>
            {data?.data?.products?.map((item, index) => (
              <CheckoutItem
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    product: item?.product._id,
                  })
                }
                cartId={data?.data?._id}
                cartProductId={item?._id}
                key={index}
                image={item?.product?.image}
                title={item.product?.name}
                type={item.product?.sub_category?.name}
                quantity={item?.count}
                price={item?.price}
                // oldPrice={data.oldPrice}
              />
            ))}
          </Card>
        )}

        {/* <Card style={{paddingHorizontal: 20, paddingVertical: 10}}>
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
            ZURAAYA's payment processor partner stores your credit card details
            by using industry-standard data encryption technology. ZURAAYA will
            not store your actual credit card information.'
          </Text>
        </Card> */}
        <VirtualizedView>
          <Collections
            products={products?.data}
            title="You may like to fill it with"
          />
        </VirtualizedView>
      </ScrollView>

      {data?.data?.products?.length > 0 && (
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
            <Text style={{...FONTS.fontXs}}>Total:</Text>
            <Text style={{...FONTS.h4, ...FONTS.fontBold}}>
              {getPrice(data?.data?.total)}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <CustomButton
              btnSm
              onPress={() => navigation.navigate('Confirm Order')}
              title={`Checkout (${data?.data?.products.length})`}
            />
          </View>
        </View>
      )}
    </Root>
  );
};

export default Cart;
