import React, {useRef} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {IconButton} from '@react-native-material/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import Octicons from 'react-native-vector-icons/Octicons';

import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, IMAGES} from '../../constants/theme';
import Header from '../../layout/Header';
import india from '../../assets/images/flags/india.png';
import UnitedStates from '../../assets/images/flags/UnitedStates.png';
import german from '../../assets/images/flags/german.png';
import italian from '../../assets/images/flags/italian.png';
import spanish from '../../assets/images/flags/spanish.png';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const languagetData = [
  {
    flag: india,
    name: 'Indian',
  },
  {
    flag: UnitedStates,
    name: 'English',
  },
  {
    flag: german,
    name: 'German',
  },
  {
    flag: italian,
    name: 'Italian',
  },
  {
    flag: spanish,
    name: 'Spanish',
  },
];

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

const Row = ({title, items}) => {
  return (
    <View style={{backgroundColor: COLORS.white, marginBottom: 10}}>
      <View style={{...GlobalStyleSheet.container}}>
        <Text style={{...FONTS.font, ...FONTS.fontBold}}>{title}</Text>
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
  const RBSheetLanguage = useRef();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'wishlist', title: 'Wishlist'},
    {key: 'recentlyViewed', title: 'Recently Viewed'},
  ]);

  return (
    <>
      <RBSheet
        ref={RBSheetLanguage}
        closeOnDragDown={true}
        height={400}
        openDuration={300}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.3)',
          },
          container: {
            backgroundColor: COLORS.white,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.borderColor,
            paddingBottom: 8,
            paddingTop: 4,
          }}>
          <Text style={{...FONTS.h5, color: COLORS.title}}>Language</Text>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 15}}>
          {languagetData.map((data, index) => (
            <TouchableOpacity
              onPress={() => RBSheetLanguage.current.close()}
              key={index}
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: COLORS.borderColor,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 20,
                  width: 25,
                  marginRight: 12,
                }}
                source={data.flag}
              />
              <Text style={{...FONTS.fontLg, color: COLORS.title, flex: 1}}>
                {data.name}
              </Text>
              <FeatherIcon name="chevron-right" color={COLORS.text} size={24} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}>
        <ScrollView>
          <View style={{...GlobalStyleSheet.container}}>
            <View style={{paddingVertical: 30}}>
              <Text style={{...FONTS.h3}}>Hi, Emmanuel</Text>
            </View>
          </View>
          <Row title="My Orders" items={myOrders} />
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileBtn: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingHorizontal: 15,
    paddingBottom: 7,
    paddingTop: 8,
    borderRadius: 6,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
});

export default Profile;
