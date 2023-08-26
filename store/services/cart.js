import {CART} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCart: build.query({
      query: () => '/cart',
      providesTags: [CART],
    }),
    addToCart: build.mutation({
      query: body => ({
        url: '/cart',
        method: 'POST',
        body,
      }),
      invalidatesTags: [CART],
    }),
    updateCartCount: build.mutation({
      query: ({cartProductId, count, cartId}) => ({
        url: `/cart/${cartId}/cartProducts/${cartProductId}`,
        method: 'PUT',
        body: {count},
      }),
      invalidatesTags: [CART],
      // async onQueryStarted({productId, count}, {dispatch, queryFulfilled}) {
      //   const patchResult = dispatch(
      //     extendedApi.util.updateQueryData('getCart', undefined, draft => {
      //       const product = draft.products.find(product.id === productId);
      //       if (product) {
      //         product.count = count;
      //         draft.products = [...draft.products, product];
      //       }
      //     }),
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
    clearCart: build.mutation({
      query: () => ({
        url: `/cart`,
        method: 'DELETE',
      }),
      invalidatesTags: [CART],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartCountMutation,
  useClearCartMutation,
} = extendedApi;
