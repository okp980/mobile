import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {COLORS, FONTS} from '../../constants/theme';
import CacheImage from '../../components/CacheImage/CacheImage';

const CategoryItem = ({
  title,
  id,
  image,
  categoryStartIndex,
  itemIndex,
  setCategoryStartIndex,
  setCategory,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isEqual = Boolean(categoryStartIndex === itemIndex);
    return {
      marginBottom: withTiming(isEqual ? 18 : 10),
      transform: [
        {
          scale: withTiming(isEqual ? 1.5 : 1),
        },
      ],
    };
  }, [categoryStartIndex, itemIndex]);
  return (
    <TouchableOpacity
      onPress={() => {
        setCategoryStartIndex(itemIndex);
        setCategory(id);
      }}>
      <View
        style={{
          // height: 120,
          width: 80,
          marginRight: 10,
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <Animated.View
          style={[
            {
              height: 50,
              width: 50,
              borderRadius: 50 / 2,
              borderColor: COLORS.white,
              borderWidth: 1,
              overflow: 'hidden',
            },
            animatedStyle,
          ]}>
          <CacheImage
            source={{uri: image ?? ''}}
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode="contain"
          />
        </Animated.View>
        <Text
          style={{
            ...FONTS.fontSm,
            textAlign: 'center',
            color: COLORS.white,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryItem;
