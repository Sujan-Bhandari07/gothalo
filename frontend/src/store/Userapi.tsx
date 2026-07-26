import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),



      

      // Update the endpoint as needed
    }),

    //
  }),
})

export const { useRegisterMutation } = userApi

export default userApi
