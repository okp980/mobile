import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Orders_Route} from '../../constants/routes';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const Row = ({title, items, data, showCount, more, onHandleMore, type}) => {
  const navigation = useNavigation();
  const getCount = title => {
    const field = Object.keys(data).find(
      item => item.toLowerCase() === title.toLowerCase(),
    );
    return data[field];
  };
  const handlePress = title => {
    navigation.navigate(Orders_Route, {show: title});
  };
  const handleLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // IOS Properties
          dismissButtonStyle: 'Done',
          animated: true,
          modalEnabled: true,
          // Android properties
          showTitle: false,
        });
      } else {
        //
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnect = async url => {
    // const fb_page_id = 100077467303465;
    // const fb_page_id_2 = 180729531185956;
    // const scheme = Platform.select({
    //   ios: 'fb://profile/',
    //   android: 'fb://page/',
    // });

    // const final_url = `${scheme}${fb_page_id}`;
    // if (await Linking.canOpenURL(final_url)) {
    //   await Linking.openURL(final_url);
    // } else if (await Linking.canOpenURL('https://web.facebook.com/zuraaya11')) {
    //   await Linking.openURL('https://web.facebook.com/zuraaya11');
    // } else {
    //   console.log('cannot open link');
    // }

    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  };
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
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
                type === 'support'
                  ? handleLink(item.url)
                  : type === 'order'
                  ? handlePress(item.title)
                  : type === 'connect'
                  ? handleConnect(item.url)
                  : null
              }>
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
                <Text style={{...FONTS.fontSm}}>{item.title}</Text>
                {showCount && (
                  <Text
                    style={{...FONTS.fontSm, ...FONTS.fontBold, marginTop: 5}}>
                    {getCount(item?.title)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({});
