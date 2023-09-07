import {TouchableOpacity, View, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

const HomeCategoryItem = ({categoryItem, category, setCategory}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setCategory(categoryItem);
      }}>
      <View
        style={{
          height: 40,
          marginHorizontal: 10,
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontBold,
            textTransform: 'uppercase',
            color:
              categoryItem?.id === category?.id ? COLORS.white : COLORS.white,
          }}>
          {categoryItem?.name}
        </Text>
        {categoryItem?.id === category?.id && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 3,
              width: '100%',
              backgroundColor: COLORS.white,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HomeCategoryItem;
