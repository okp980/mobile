import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Rating = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <IonIcon
        name="star"
        size={15}
        style={{marginRight: 4}}
        color={'#FDCC0D'}
      />
      <IonIcon
        name="star"
        size={15}
        style={{marginRight: 4}}
        color={'#FDCC0D'}
      />
      <IonIcon
        name="star"
        size={15}
        style={{marginRight: 4}}
        color={'#FDCC0D'}
      />
      <IonIcon
        name="star-half-sharp"
        size={15}
        style={{marginRight: 4}}
        color={'#FDCC0D'}
      />
      <IonIcon name="star-outline" size={15} color={'#FDCC0D'} />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
