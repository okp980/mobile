import {DEFAULT_ADDRESS, SHIPPING_ADDRESS} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    register: build.mutation({
      query: ({email, password}) => ({
        url: '/auth/register',
        method: 'POST',
        body: {email, password},
      }),
    }),
    signIn: build.mutation({
      query: ({email, password}) => ({
        url: '/auth/login',
        method: 'POST',
        body: {email, password},
      }),
      invalidatesTags: [DEFAULT_ADDRESS],
    }),
    forgotPassword: build.mutation({
      query: ({email}) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body: {email},
      }),
    }),
    changePassword: build.mutation({
      query: ({oldPassword, newPassword, confirmPassword}) => ({
        url: '/auth/password',
        method: 'POST',
        body: {oldPassword, newPassword, confirmPassword},
      }),
    }),
    updateProfile: build.mutation({
      query: ({email, name}) => ({
        url: '/auth/me',
        method: 'PUT',
        body: {email, name},
      }),
    }),
    getProfile: build.query({
      query: () => '/auth/me',
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetProfileQuery,
  useSignInMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useUpdateProfileMutation,
  // useLazyRegisterMutation,
  // useLazySignInMutation,
  // useLazyForgotPasswordMutation,
  // useLazyChangePasswordMutation,
  // useLazyUpdateProfileMutation,
  // useGetProfileQuery,
} = authApi;
