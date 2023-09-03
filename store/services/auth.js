import {
  DEFAULT_ADDRESS,
  SHIPPING_ADDRESS,
  SHIPPING_METHODS,
} from '../../app/constants/Tags';
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
      invalidatesTags: [
        {type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS},
        SHIPPING_METHODS,
      ],
    }),
    forgotPassword: build.mutation({
      query: ({email}) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body: {email},
      }),
    }),
    verifyOtp: build.mutation({
      query: ({otp}) => ({
        url: '/auth/otp',
        method: 'POST',
        body: {otp},
      }),
    }),
    changePassword: build.mutation({
      query: ({oldPassword, newPassword, confirmPassword}) => ({
        url: '/auth/password',
        method: 'PUT',
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
  useVerifyOtpMutation,
  // useLazyRegisterMutation,
  // useLazySignInMutation,
  // useLazyForgotPasswordMutation,
  // useLazyChangePasswordMutation,
  // useLazyUpdateProfileMutation,
  // useGetProfileQuery,
} = authApi;
