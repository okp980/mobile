import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Root from '../../components/Root';
import {COLORS, FONTS} from '../../constants/theme';
import {useState} from 'react';

const NotificationPreference = () => {
  // states

  const [Offers, setOffers] = useState(true);
  const [newAndExclusive, setNewAndExclusive] = useState(true);
  const [stockSales, setstockSales] = useState(true);

  //   toggle handler

  const toggleOffers = () => setOffers(previousState => !previousState);
  const toggleNewAndExclusive = () =>
    setNewAndExclusive(previousState => !previousState);
  const toggleStockSales = () => setstockSales(previousState => !previousState);

  //   use effects

  return (
    <Root>
      {/* Special Offers and Promotions */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Text style={{...FONTS.font}}>Special Offers and Promotions</Text>
        <Switch
          trackColor={{false: COLORS.gray, true: COLORS.primary}}
          thumbColor={Offers ? COLORS.white : COLORS.dark}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleOffers}
          value={Offers}
        />
      </View>
      {/* New and Exclusive */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Text style={{...FONTS.font}}>New and Exclusive</Text>
        <Switch
          trackColor={{false: COLORS.gray, true: COLORS.primary}}
          thumbColor={newAndExclusive ? COLORS.white : COLORS.dark}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNewAndExclusive}
          value={newAndExclusive}
        />
      </View>
      {/* Stock and Sales Alerts */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Text style={{...FONTS.font}}>Stock and Sales Alerts</Text>
        <Switch
          trackColor={{false: COLORS.gray, true: COLORS.primary}}
          thumbColor={stockSales ? COLORS.white : COLORS.dark}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleStockSales}
          value={stockSales}
        />
      </View>
    </Root>
  );
};

export default NotificationPreference;

const styles = StyleSheet.create({});
