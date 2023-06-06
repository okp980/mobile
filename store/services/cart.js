import {CART} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCart: build.query({
      query: () => '/cart',
      providesTags: [CART],
    }),
    addToCart: build.mutation({
      query: productId => ({
        url: '/cart',
        method: 'POST',
        body: {productId},
      }),
      invalidatesTags: [CART],
    }),
    updateCartCount: build.mutation({
      query: ({productId, count}) => ({
        url: `/cart/${productId}`,
        method: 'PUT',
        body: {count},
      }),
      async onQueryStarted({productId, count}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData('getCart', undefined, draft => {
            const product = draft.products.find(product.id === productId);
            if (product) {
              product.count = count;
              draft.products = [...draft.products, product];
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateCartItem: build.mutation({
      query: productId => ({
        url: `/cart/${productId}`,
        method: 'PUT',
      }),
      invalidatesTags: [CART],
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
  useUpdateCartItemMutation,
  useClearCartMutation,
} = extendedApi;
