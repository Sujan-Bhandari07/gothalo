import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL,credentials:"include" }),
  
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body: data,
      }),
    }),


    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/signin",
        method: "POST",
        body: data,
      }),
    }),

logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",

      }),
    }),



    getprofile: builder.query({
      query: () => ({
        url: "/api/v1/auth/getprofile",
        method: "GET",

      }),
    }),



    

    // Update the endpoint as needed

    //
  }),
});

export const { useRegisterMutation,useLoginMutation ,useLogoutMutation,useGetprofileQuery} = userApi;

export default userApi;
