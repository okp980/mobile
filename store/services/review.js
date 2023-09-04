import {
  CART,
  REVIEWS_PRODUCTS_TAG,
  REVIEWS_TAG,
} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getReviews: build.query({
      query: params => ({url: '/reviews', params}),
      providesTags: [REVIEWS_TAG],
    }),
    createReview: build.mutation({
      query: values => ({url: '/reviews', method: 'POST', body: values}),
      transformResponse: response => response.data,
      invalidatesTags: [
        REVIEWS_TAG,
        {type: REVIEWS_TAG, id: REVIEWS_PRODUCTS_TAG},
      ],
    }),
    getProductReview: build.query({
      query: id => `/products/${id}/reviews`,
      //   transformResponse: response => response.data,
      providesTags: [{type: REVIEWS_TAG, id: REVIEWS_PRODUCTS_TAG}],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetProductReviewQuery,
} = extendedApi;
