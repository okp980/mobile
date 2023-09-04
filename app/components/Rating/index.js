import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';

const Rating = ({rating}) => {
  const getStars = () => {
    let stars = [];

    if (rating === 1) {
      stars = [
        'star',
        'star-outline',
        'star-outline',
        'star-outline',
        'star-outline',
      ];
    } else if (rating > 1 && rating < 2) {
      stars = [
        'star',
        'star-half-sharp',
        'star-outline',
        'star-outline',
        'star-outline',
      ];
    } else if (rating === 2) {
      stars = ['star', 'star', 'star-outline', 'star-outline', 'star-outline'];
    } else if (rating > 2 && rating < 3) {
      stars = [
        'star',
        'star',
        'star-half-sharp',
        'star-outline',
        'star-outline',
      ];
    } else if (rating === 3) {
      stars = ['star', 'star', 'star', 'star-outline', 'star-outline'];
    } else if (rating > 3 && rating < 4) {
      stars = ['star', 'star', 'star', 'star-half-sharp', 'star-outline'];
    } else if (rating === 4) {
      stars = ['star', 'star', 'star', 'star', 'star-outline'];
    } else if (rating > 4 && rating < 5) {
      stars = ['star', 'star', 'star', 'star', 'star-half-sharp'];
    } else if (rating === 5) {
      stars = ['star', 'star', 'star', 'star', 'star'];
    } else {
      stars = [
        'star-outline',
        'star-outline',
        'star-outline',
        'star-outline',
        'star-outline',
      ];
    }

    return stars;
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {getStars().map((star, index) => (
        <IonIcon
          key={index}
          name={star}
          size={12}
          style={{marginRight: 4}}
          color={COLORS.gray}
        />
      ))}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
