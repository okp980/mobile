import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons//MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Header from '../../layout/Header';
import pic1 from '../../assets/images/shop/detail/pic1.png';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {Divider, Snackbar} from 'react-native-paper';
import ShippingMethod from '../Components/ShippingMethods';
import Sizes from '../../components/Sizes';
import ProductMeasure from '../../components/ProductMeasure';
import Description from '../../components/Description';
import Reviews from '../../components/Reviews';
import ProductCarousel from '../../components/ProductCarousel';
import Collections from '../Components/Collections';
import {TopCollection} from '../Home/Home';
import Rating from '../../components/Rating';
import Card from '../../components/Card';
import {
  useGetProductsQuery,
  useGetSingleProductsQuery,
} from '../../../store/services/products';
import {useAddToCartMutation} from '../../../store/services/cart';
import Loading from '../../components/Loading/Loading';
import ErrorOccurred from '../../components/ErrorOccurred/ErrorOccurred';
import useNetwork from '../../../hooks/useNetwork';
import {useGetShippingMethodsCostQuery} from '../../../store/services/shippingMethod';
import HorizontalCollections from '../../components/HorizontalCollections.js';
import useToast from '../../../hooks/useToast';

const productImage = [pic1, pic1, pic1];

const ProductDetail = ({navigation, route}) => {
  const product = route?.params?.product;
  const {data, isLoading, isError, isSuccess, error} =
    useGetSingleProductsQuery(product);

  const {data: shippingCosts} = useGetShippingMethodsCostQuery(product);
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productError,
  } = useGetProductsQuery(undefined);

  const [addToCart] = useAddToCartMutation();

  const [isLike, setIsLike] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');

  const {isConnected} = useNetwork();
  const {handleMessageToast, handleErrorToast} = useToast();

  const handleAddToCart = async product => {
    try {
      await addToCart(product).unwrap();
      handleMessageToast({message: 'Added to Cart'});
    } catch (error) {
      handleErrorToast({message: 'Failed to add to cart'});
    }
  };

  const handleLike = () => {
    if (isLike) {
      setSnackText('Item removed to Favourite.');
    } else {
      setSnackText('Item add to Favourite.');
    }
    setIsSnackbar(true);
    setIsLike(!isLike);
  };

  if (isLoading || isLoadingProducts) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}>
        <StatusBar animated={true} translucent={true} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}>
        <StatusBar animated={true} translucent={true} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ErrorOccurred
            isConnected={isConnected}
            caption={error?.data?.error}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <View>
          {/* Product carousel */}
          <Swiper
            style={{height: SIZES.width}}
            dotStyle={{
              height: 10,
              width: 10,
              borderWidth: 2,
              borderColor: COLORS.white,
              borderRadius: 10,
            }}
            activeDotStyle={{
              height: 10,
              width: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            {data?.data?.gallery?.map((item, index) => {
              return (
                <View key={index}>
                  <Image
                    source={{
                      uri: `http://localhost:4000/uploads/${item}`,
                    }}
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1 / 1,
                    }}
                  />
                  <LinearGradient
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      top: 0,
                      left: 0,
                    }}
                    colors={[
                      'rgba(0,0,0,.3)',
                      'rgba(0,0,0,0)',
                      'rgba(0,0,0,0)',
                    ]}></LinearGradient>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View>
          <Card style={{padding: 15}}>
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <Text style={{...FONTS.fontLg, color: COLORS.dark}}>
                {data?.data?.name}
              </Text>
              <View
                style={{
                  marginBottom: 5,
                  marginTop: 5,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      ...FONTS.fontXs,

                      color: COLORS.text,
                      textTransform: 'capitalize',
                    }}>
                    <Text style={{...FONTS.fontBold}}> Brand: </Text>
                    {data?.data?.brand}
                  </Text>
                </View>

                <Rating />
              </View>
            </View>
            <View style={styles.price}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.h4,
                    ...FONTS.fontBold,
                    marginRight: 5,
                    color: COLORS.dark,
                  }}>
                  ₦{data?.data?.price}
                </Text>
                <Text
                  style={{
                    ...FONTS.fontBold,
                    textDecorationLine: 'line-through',
                    color: COLORS.text,
                    marginRight: 8,
                  }}>
                  {data?.data?.oldPrice}
                </Text>
              </View>

              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.success,
                }}>
                Available in stock
              </Text>
              <View>
                <Text style={{...FONTS.fontSm, color: COLORS.text}}>
                  <Text style={{...FONTS.fontBold}}>Color: </Text>
                  {data?.data?.color}
                </Text>
              </View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{
                    ...FONTS.font,
                    color: COLORS.dark,
                  }}>
                  <Text
                    style={{
                      ...FONTS.fontBold,
                    }}>
                    SKU
                  </Text>{' '}
                  : sw28220390280239230230
                </Text>
              </View>
            </View>
            {/* <Sizes /> */}
            <Divider />
            <TouchableOpacity>
              <View style={{flexDirection: 'row', paddingVertical: 15}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <MaterialCommunityIcons
                    name="shield-sync-outline"
                    size={18}
                  />
                  <Text style={{...FONTS.font, marginLeft: 10}}>
                    Return Policy
                  </Text>
                </View>
                <View>
                  <Ionicon name="chevron-forward" size={18} />
                </View>
              </View>
            </TouchableOpacity>
          </Card>

          {/* <ProductMeasure /> */}

          <Description />
          <ShippingMethod shippingCosts={shippingCosts} />

          <HorizontalCollections
            products={products?.data}
            title="Similar products under this category"
            category={products}
          />

          <Reviews />

          <HorizontalCollections
            products={products?.data}
            title="Recently viewed products"
            category={products}
          />

          <Collections products={products?.data} title="Recommended Products" />
        </View>
      </ScrollView>
      <View style={styles.buy}>
        <TouchableOpacity
          onPress={() => handleLike()}
          activeOpacity={0.95}
          style={{
            height: 40,
            width: 40,
            backgroundColor: COLORS.primaryLight,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          {isLike ? (
            <FontAwesome name="heart" color={COLORS.primary} size={22} />
          ) : (
            <FontAwesome name="heart-o" color={COLORS.primary} size={22} />
          )}
        </TouchableOpacity>
        <CustomButton
          color={COLORS.dark}
          customStyles={{flex: 1}}
          onPress={() => handleAddToCart(product)}
          title="ADD TO CART"
        />
      </View>
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
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  buy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    backgroundColor: COLORS.backgroundColor,
  },
  price: {
    marginRight: 10,
  },
});
