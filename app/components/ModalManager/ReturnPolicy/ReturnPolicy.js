import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/theme';
import CustomMarkDown from '../../CustomMarkDown/CustomMarkDown';

const text = `
###Return and Refund policy


At Zuraya, we strive to ensure customer satisfaction with our products. If you are not completely satisfied with your purchase, we offer a straightforward return and refund policy. Here are the key points to understand:

**Eligibility for Returns:** To be eligible for a return, the item must be unused, in its original condition, and returned within the specified return period. This period is typically 7 days from the date of delivery.


**Initiate the Return:** To initiate a return, please contact our customer support team either through email or phone. Provide them with your order details, reason for the return, and any relevant information. They will guide you through the return process.


**Return Authorization:** After reviewing your request, our customer support team will provide you with a return authorization, which may include a return shipping label or instructions for returning the item.


**Packaging and Return Shipping:** Please ensure that the item is properly packaged to prevent damage during transit. If a return shipping label is provided, affix it to the package. Follow the provided instructions for return shipping or use a reliable shipping method with tracking to send the item back to us. Contact our support system so you can deliver to our sorting center in Lagos, Nigeria.


**Refund Process:** Once we receive the returned item and verify its condition, we will process your refund. Refunds are typically issued using the original payment method used for the purchase. Please note that it may take a few business days or immediately for the refund to reflect in your account.


**Non-Refundable Items:** Some items may not be eligible for return or refund due to hygiene reasons, sensitive nature, or other specific circumstances. A few example is underwears. These details will be outlined in our product descriptions or mentioned separately in our return policy.


**Additional Notes:** It's important to carefully review our complete return and refund policy, which can be found on our website or provided upon request. It contains more detailed information regarding exceptions, timelines, and any associated fees, such as restocking fees or return shipping costs.


If you have any questions or need further clarification regarding our return and refund policy, please don't hesitate to reach out to our customer support team. We are here to assist you and ensure a smooth return process.

`;

const ReturnPolicy = () => {
  const {height} = useWindowDimensions();
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <ScrollView
        style={{
          maxHeight: height - 200,
          backgroundColor: COLORS.white,
        }}>
        <View style={{paddingHorizontal: 20, paddingBottom: 200}}>
          <CustomMarkDown>{text}</CustomMarkDown>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReturnPolicy;

const styles = StyleSheet.create({});
