import {DEFAULT_ADDRESS, SHIPPING_ADDRESS} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUserShippingAddress: build.query({
      query: () => ({
        url: '/shipping-address/user',

        keepUnusedDataFor: 0,
      }),
      transformResponse: response => response.data,
      // providesTags: result =>
      //   result
      //     ? [
      //         ...result.map(({id}) => ({type: SHIPPING_ADDRESS, id})),
      //         {type: SHIPPING_ADDRESS, id: 'LIST'},
      //       ]
      //     : [{type: SHIPPING_ADDRESS, id: 'LIST'}],
      providesTags: [SHIPPING_ADDRESS],
    }),

    getDefaultShippingAddress: build.query({
      query: () => ({
        url: '/shipping-address/user/default',
      }),
      transformResponse: response => response.data,
      providesTags: [{type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS}],
    }),
    updateDefaultAddress: build.mutation({
      query: id => ({
        url: `shipping-address/${id}/default`,
        method: 'PUT',
      }),
      transformResponse: response => response.data,
      invalidatesTags: [
        SHIPPING_ADDRESS,
        {type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS},
      ],
      //   invalidatesTags: [{type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS}], remove
    }),
    getSingleShippingAddress: build.query({
      query: id => ({
        url: `/shipping-address/${id}`,
      }),
      transformResponse: response => response.data,
      //   providesTags: result =>
      //     result
      //       ? [
      //           {type: SHIPPING_ADDRESS, id:result.id},
      //
      //         ]
      //       : [{type: SHIPPING_ADDRESS, id: 'SINGLE_ADDRESS'}],
    }),
    updateSingleAddress: build.mutation({
      query: ({id, values}) => ({
        url: `/shipping-address/${id}`,
        method: 'PUT',
        body: values,
      }),
      transformResponse: response => response.data,
      invalidatesTags: [
        SHIPPING_ADDRESS,
        {type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS},
      ],
      //   invalidatesTags: result =>
      //     result
      //       ? [
      //           {type: SHIPPING_ADDRESS, id:result.id},
      //
      //         ]
      //       : [{type: SHIPPING_ADDRESS, id: 'SINGLE_ADDRESS'}],
    }),
    createShippingAddress: build.mutation({
      query: values => ({
        url: '/shipping-address',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: [
        SHIPPING_ADDRESS,
        {type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS},
      ],
    }),
    deleteShippingAddress: build.mutation({
      query: id => ({
        url: `/shipping-address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        SHIPPING_ADDRESS,
        {type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS},
      ],
    }),
  }),

  overrideExisting: true,
});

export const {
  useUpdateDefaultAddressMutation,
  useUpdateSingleAddressMutation,
  useLazyGetSingleShippingAddressQuery,
  useLazyGetUserShippingAddressQuery,
  useGetDefaultShippingAddressQuery,
  useLazyGetDefaultShippingAddressQuery,
  useGetUserShippingAddressQuery,
  useCreateShippingAddressMutation,
  useDeleteShippingAddressMutation,
} = extendedApi;
