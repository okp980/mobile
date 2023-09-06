import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Root from '../../components/Root';
import StarRating from 'react-native-star-rating-widget';
import {COLORS, FONTS} from '../../constants/theme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useCreateReviewMutation} from '../../../store/services/review';
import {showMessage} from 'react-native-flash-message';

const AddReview = ({navigation, route}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {order} = route.params;
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Rating must be between 1 and 5');
      return;
    } else if (comment.length === 0) {
      setError('Comment cannot be Empty!');
      return;
    } else {
      setError('');
    }
    try {
      setLoading(true);
      await createReview({rating, order, comment}).unwrap();
    } catch (error) {
      setError(error?.data?.error || 'Error creating review');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Root>
      <View style={{flex: 1, paddingTop: 50}}>
        <View style={{marginBottom: 25, alignItems: 'center'}}>
          <Text style={{...FONTS.font, color: COLORS.danger, marginBottom: 15}}>
            {error}
          </Text>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              color: COLORS.title,
              marginBottom: 5,
            }}>
            Select Rating
          </Text>
          <StarRating
            rating={rating}
            onChange={setRating}
            color={COLORS.primary}
          />
        </View>
        <CustomInput
          multiline
          inputStyle={{height: 100}}
          textAlignVertical={'top'}
          label={'Comment'}
          value={comment}
          onChangeText={setComment}
        />
        <CustomButton
          title="Submit Review"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </Root>
  );
};

export default AddReview;

const styles = StyleSheet.create({});
