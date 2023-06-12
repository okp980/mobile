import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    createOrder: build.mutation({
      query: values => ({url: '/orders', method: 'POST', body: values}),
      transformResponse: response => response.data,
    }),
    OrderPayment: build.mutation({
      query: ({id, data}) => ({
        url: `/orders/${id}/pay`,
        method: 'POST',
        body: data,
      }),
      transformResponse: response => response.data,
    }),
  }),

  overrideExisting: true,
});

export const {useCreateOrderMutation, useOrderPaymentMutation} = extendedApi;
