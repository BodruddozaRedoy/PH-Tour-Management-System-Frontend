import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  IResponseSendOtp,
  IResponseVerifyOtp,
  ISendOtp,
  IVerifyOtp,
} from "@/types/index.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: `/user/register`,
        method: "POST",
        data: payload,
      }),
    }),
    login: builder.mutation<null, ILogin>({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        data: payload,
      }),
    }),
    sendOtp: builder.mutation<IResponseSendOtp<null>, ISendOtp>({
      query: (email) => ({
        url: `/otp/send`,
        method: "POST",
        data: email,
      }),
    }),
    verifyOtp: builder.mutation<IResponseVerifyOtp<null>, IVerifyOtp>({
      query: (payload) => ({
        url: `/otp/verify`,
        method: "POST",
        data: payload,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: `/user/me`,
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"]
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation
} = authApi;
