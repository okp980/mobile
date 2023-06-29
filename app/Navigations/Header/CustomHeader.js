import {useEffect, useState} from 'react';
import {useGetCartQuery} from '../../../store/services/cart';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ProductDetail_Route} from '../../constants/routes';

export function CustomHeader({showBackBtn, navigation, route, ...props}) {
  const [cartCount, setCartCount] = useState(0);
  const {data, isLoading, isSuccess, isError} = useGetCartQuery();
  const length = data?.data?.products?.length;
  useEffect(() => {
    if (isSuccess && data?.data !== null) {
      setCartCount(length);
    } else {
      setCartCount(0);
    }
  }, [isSuccess, length]);

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
      }}>
      {showBackBtn && (
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={{marginRight: 10}}>
            <MaterialIcons name="west" size={28} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={{flex: 1, height: 40}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            marginRight: 7,
            paddingHorizontal: 5,
            alignItems: 'center',
            borderRadius: SIZES.radius_xs,
          }}>
          <Ionicons
            name="search"
            size={18}
            style={{marginRight: 5}}
            color={COLORS.primary}
          />
          <View style={{flex: 1}}>
            <Text style={{...FONTS.fontXs, color: COLORS.primary}}>
              Search for products
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <Ionicons
            name="heart-outline"
            size={25}
            style={{marginRight: 10}}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <View style={{position: 'relative'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={25} color={COLORS.white} />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              right: -5,
              top: -0,
              height: 15,
              width: 15,
              borderRadius: 15 / 2,
              backgroundColor: COLORS.white,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.fontXs,
                margin: 1,
                padding: 0,
                color: COLORS.primary,
              }}>
              {cartCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
