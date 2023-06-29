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

const myOrders = [
  {title: 'Unpaid', icon: 'ios-card-outline'},
  {title: 'Processing', icon: 'ios-sync'},
  {title: 'Shipped', icon: 'car-outline'},
  {title: 'Review', icon: 'ios-reader-outline'},
  {title: 'Returns', icon: 'ios-arrow-undo-circle-outline'},
];
const support = [
  {title: 'FAQs', icon: 'ios-card-outline'},
  {title: 'Live Chat', icon: 'ios-sync'},
  {title: 'Contact Us', icon: 'car-outline'},
];
const socials = [
  {title: 'Facebook', icon: 'ios-card-outline'},
  {title: 'Twitter', icon: 'ios-sync'},
  {title: 'Instagram', icon: 'car-outline'},
];
const information = [
  {title: 'Rating', icon: 'ios-card-outline'},
  {title: 'Feedback', icon: 'ios-sync'},
];

const Row = ({title, items, more, onHandleMore}) => {
  return (
    <View style={{backgroundColor: COLORS.white, marginBottom: 10}}>
      <View style={{...GlobalStyleSheet.container}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>{title}</Text>
          {more && (
            <TouchableOpacity onPress={onHandleMore}>
              <Text style={{...FONTS.Xs, textDecorationLine: 'underline'}}>
                {more}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          {items?.map((item, index) => (
            <TouchableOpacity style={{flex: 1}}>
              <View
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={COLORS.dark}
                  style={{marginBottom: 5}}
                />
                <Text style={{...FONTS.fontXs}}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

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

  const {token} = useAuth();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'wishlist', title: 'Wishlist'},
    {key: 'recentlyViewed', title: 'Recently Viewed'},
  ]);

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
              <Text style={{...FONTS.fontLg, color: COLORS.white}}>
                Welcome
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
        <Row
          title="My Orders"
          items={myOrders}
          more={'View All'}
          onHandleMore={() => {
            navigation.navigate(Orders_Route);
          }}
        />
        <Row title="Support" items={support} />
        <Row title="Connect with us" items={socials} />
        <Row title="Give us your feedback" items={information} />
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
