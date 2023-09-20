import {CART, ORDERS_TAG} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query({
      query: params => ({url: '/orders/user', params}),
    }),
    createOrder: build.mutation({
      query: values => ({url: '/orders', method: 'POST', body: values}),
      transformResponse: response => response.data,
      invalidatesTags: [CART],
    }),
    getSingleOrder: build.query({
      query: id => `/orders/${id}`,
      transformResponse: response => response.data,
      providesTags: [{type: ORDERS_TAG, id: 'SINGLE_ORDER'}],
    }),
    payUnpaidOrder: build.query({
      query: id => `/orders/${id}/pay`,
      transformResponse: response => response.data,
      invalidatesTags: [{type: ORDERS_TAG, id: 'SINGLE_ORDER'}],
    }),
    OrderPayment: build.mutation({
      query: ({id, data}) => ({
        url: `/orders/${id}/pay`,
        method: 'POST',
        body: data,
      }),
      transformResponse: response => response.data,
    }),
    getOrdersSummary: build.query({
      query: () => ({url: '/summary/orders'}),
    }),
  }),

  overrideExisting: true,
});

export const {
  useLazyPayUnpaidOrderQuery,
  useCreateOrderMutation,
  useOrderPaymentMutation,
  useGetSingleOrderQuery,
  useLazyGetOrdersQuery,
  useGetOrdersSummaryQuery,
} = extendedApi;
