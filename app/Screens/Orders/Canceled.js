import React from 'react';
import SampleOrders from './SampleOrders';

const Canceled = () => {
  return <SampleOrders params={{refunded: true}} />;
};

export default Canceled;
