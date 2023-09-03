import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Orders_Route, Sign_In} from '../../constants/routes';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../../hooks/useAuth';
import Root from '../../components/Root';
import {useGetOrdersSummaryQuery} from '../../../store/services/order';
import Row from './Row';
import Loading from '../../components/Loading/Loading';
import {useGetProfileQuery} from '../../../store/services/auth';

const myOrders = [
  {title: 'Unpaid', icon: 'ios-card-outline'},
  {title: 'Processing', icon: 'ios-sync'},
  {title: 'Shipped', icon: 'car-outline'},
  {title: 'Review', icon: 'ios-reader-outline'},
  {title: 'Return', icon: 'ios-arrow-undo-circle-outline'},
];
const support = [
  {title: 'FAQs', icon: 'ios-card-outline', url: 'https://zuraaya.com/faq'},
  {title: 'Live Chat', icon: 'ios-sync', url: 'https://zuraaya.com/faq'},
  {title: 'Contact Us', icon: 'car-outline', url: 'https://zuraaya.com/faq'},
];
const socials = [
  {
    title: 'Facebook',
    icon: 'ios-card-outline',
    url: 'https://facebook.com/zuraaya11',
  },
  {
    title: 'Twitter',
    icon: 'ios-sync',
    url: 'https://twitter.com/Zuraaya1?s=20',
  },
  {
    title: 'Instagram',
    icon: 'car-outline',
    url: 'https://instagram.com/zuraaya1?igshid=NTc4MTIwNjQ2YQ==',
  },
];
const information = [
  {title: 'Rating', icon: 'ios-card-outline'},
  {title: 'Feedback', icon: 'ios-sync'},
];

// Tabs

const Wishlist = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const RecentlyViewed = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  wishlist: Wishlist,
  recentlyViewed: RecentlyViewed,
});

const customTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: COLORS.dark}}
    style={{backgroundColor: 'transparent'}}
    labelStyle={{...FONTS.font, ...FONTS.fontBold, color: COLORS.dark}}
  />
);

//  onPress={() => RBSheetLanguage.current.open()}
const Profile = ({navigation}) => {
  const layout = useWindowDimensions();
  const {
    data: summary,
    isSuccess: isSummaryOrderSuccess,
    isLoading: isLoadingOrderSummary,
  } = useGetOrdersSummaryQuery();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetProfileQuery();

  const {token} = useAuth();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'wishlist', title: 'Wishlist'},
    {key: 'recentlyViewed', title: 'Recently Viewed'},
  ]);

  if (isLoadingOrderSummary || isLoadingProfile) return <Loading />;

  return (
    <Root noPadding>
      <ScrollView>
        <View
          style={{
            ...GlobalStyleSheet.container,
            backgroundColor: COLORS.dark,
          }}>
          <View style={{paddingVertical: 10}}>
            {token ? (
              <Text
                style={{
                  ...FONTS.fontLg,
                  color: COLORS.white,
                  textTransform: 'capitalize',
                }}>
                Welcome {profile?.user?.email.split('@')[0]}
              </Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      ...FONTS.fontLg,
                      color: COLORS.white,
                      marginBottom: 5,
                    }}>
                    Welcome
                  </Text>
                  <Text style={{...FONTS.fontXs, color: COLORS.white}}>
                    Log in to your account
                  </Text>
                </View>
                <View>
                  <CustomButton
                    title="Sign In"
                    btnSm
                    outline
                    customStyles={{borderColor: COLORS.white}}
                    textColor={COLORS.white}
                    onPress={() => navigation.navigate(Sign_In)}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        {token && isSummaryOrderSuccess && (
          <Row
            title="My Orders"
            items={myOrders}
            showCount
            data={summary?.data}
            more={'View All'}
            onHandleMore={() => {
              navigation.navigate(Orders_Route);
            }}
            type="order"
          />
        )}
        <Row title="Support" items={support} type="support" />
        <Row title="Connect with us" items={socials} type="connect" />
        {/* {token && <Row title="Give us your feedback" items={information} />} */}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={customTabBar}
        />
      </ScrollView>
    </Root>
  );
};

const styles = StyleSheet.create({});

export default Profile;
