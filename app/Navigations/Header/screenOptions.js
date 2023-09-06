import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../constants/theme';
import {TouchableOpacity} from 'react-native';

export const screenOptions = ({navigation, route, options}) => ({
  headerShown: true,
  headerTitle: '',
  headerTitleStyle: {...FONTS.fontLg, ...FONTS.fontBold, color: COLORS.dark},
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerTintColor: COLORS.primary,
  headerStyle: {backgroundColor: COLORS.backgroundColor},
  headerLeft: tint => (
    <TouchableOpacity onPress={navigation.goBack}>
      <MaterialIcons name="west" size={28} color={tint ? tint : COLORS.dark} />
    </TouchableOpacity>
  ),
  ...options,
});
