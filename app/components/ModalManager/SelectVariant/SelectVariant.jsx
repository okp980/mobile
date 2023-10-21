import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../constants/theme';
import CustomButton from '../../CustomButton';
import useModal from '../../../../hooks/useModal';
import ProductAttributes from '../../../Screens/Products/ProductAttributes';
import {getProductAttribute, getVariant} from '../../../../helpers/util';
import useToast from '../../../../hooks/useToast';
import {useAddToCartMutation} from '../../../../store/services/cart';

const SelectVariant = () => {
  const [variant, setVariant] = useState(null); // {type:'', qty:'} | null
  const {modalPayload, handleOpenModal, handleCloseModal} = useModal();
  const {handleMessageToast, handleErrorToast} = useToast();
  const [isLike, setIsLike] = useState(false);
  const [addToCart] = useAddToCartMutation();
  const [loading, setLoading] = useState(false);

  console.log('modal payload', modalPayload);

  const findVariants = attributes => {
    const match = getVariant(modalPayload?.variants, attributes);
    setVariant(match?.id);
    console.log('matching varaint', match);
  };
  const handleSelectVariant = id => {
    setVariant(id);
  };

  const handleAddToCart = async () => {
    if (!variant) {
      // handleMessageToast({message: 'Please choose variant'});
      return;
    }

    try {
      // handleOpenModal({type: FULL_SCREEN_LOADER});
      setLoading(true);
      await addToCart({
        productId: modalPayload?.product,
        variant,
      }).unwrap();
      setLoading(false);
      handleMessageToast({message: 'Added to Cart'});
      handleCloseModal();
    } catch (error) {
      setLoading(false);
      console.log('error here is ===>', error);
      handleCloseModal();
      handleErrorToast({message: 'Failed to add to cart'});
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <View style={{backgroundColor: COLORS.backgroundColor, padding: 20}}>
        <Text>SelectVariant</Text>
        <View>
          <ProductAttributes
            variants={modalPayload?.variants}
            onSelectVariant={handleSelectVariant}
          />
        </View>
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
            disabled={loading}
            color={COLORS.primary}
            customStyles={{flex: 1}}
            onPress={handleAddToCart}
            title="ADD TO CART"
          />
        </View>
      </View>
    </View>
  );
};

export default SelectVariant;

const styles = StyleSheet.create({
  buy: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
    paddingVertical: 12,
    // borderTopWidth: 1,
    // borderTopColor: COLORS.borderColor,
  },
  price: {
    marginRight: 10,
  },
});
