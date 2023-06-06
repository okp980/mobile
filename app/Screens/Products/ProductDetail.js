import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Header from '../../layout/Header';
import pic1 from '../../assets/images/shop/detail/pic1.png';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {Snackbar} from 'react-native-paper';
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
import {useGetSingleProductsQuery} from '../../../store/services/products';
import {useAddToCartMutation} from '../../../store/services/cart';

const productImage = [pic1, pic1, pic1];

const ProductDetail = ({navigation, route}) => {
  const {product} = route.params;
  console.log('product', product);
  const {data, isLoading, isError, isSuccess} =
    useGetSingleProductsQuery(product);

  const [addToCart] = useAddToCartMutation();

  console.log(data);

  const productColors = ['#A29698', '#80C6A9', '#8E84CA', '#E5907D'];

  const [isLike, setIsLike] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  var ratingArry = [];
  for (var i = 0; i < 4; i++) {
    ratingArry.push(i);
  }

  const [activeColor, setActiveColor] = useState(productColors[0]);

  const handleLike = () => {
    if (isLike) {
      setSnackText('Item removed to Favourite.');
    } else {
      setSnackText('Item add to Favourite.');
    }
    setIsSnackbar(true);
    setIsLike(!isLike);
  };

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <View>
          {/* Product carousel */}
          {/* <Swiper
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
            {productImage.map((data, index) => {
              return (
                <View key={index}>
                  <Image
                    source={item.imagePath ? item.imagePath : {uri: item.image}}
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
          </Swiper> */}
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
                  <Text style={{...FONTS.fontXs, color: COLORS.text}}>
                    Brand:
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
                  {data?.data?.price}
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
                  ...FONTS.fontBold,
                }}>
                20% OFF
              </Text>
            </View>
          </Card>

          <Sizes />

          <ShippingMethod />

          <ProductMeasure />

          <Description />
          <Collections
            products={TopCollection}
            // title="similar products"
            subtitle="similar products under this category"
          />
          <Reviews />
          <Collections
            products={TopCollection}
            title="recently viewed products"
          />
          <Collections
            products={TopCollection}
            title="recommended products"
            ishorinzontal={false}
          />
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
          onPress={() => addToCart(product)}
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
