import React from 'react';
import SampleOrders from './SampleOrders';

const Completed = () => {
  return <SampleOrders params={{status: 'complete'}} />;
};

export default Completed;
