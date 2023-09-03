import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {useNavigation} from '@react-navigation/native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const ListItem = ({item}) => {
  const navigation = useNavigation();
  const handleLink = async url => {
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
  };
  const handlePress = () => {
    if (item.hasOwnProperty('path')) {
      item?.path && navigation.navigate(item.path);
    }
    if (item.hasOwnProperty('url')) {
      handleLink(item?.url);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          ...GlobalStyleSheet.container,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.font}}>{item.name}</Text>
        </View>
        <View>
          <Ionicons
            name="chevron-forward"
            size={15}
            color={COLORS.borderColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
