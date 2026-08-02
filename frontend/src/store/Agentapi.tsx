import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes:["conver","send"],

  endpoints: (builder) => ({
    sendprompt: builder.mutation({
      query: (data) => ({
        url: "/api/v1/agent/sendprompt",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["send"]
    }),

    createconversation: builder.mutation({
      query: () => ({
        url: "/api/v1/agent/createconversation",
        method: "POST",
      }),
      invalidatesTags:["conver"]
    }),



    getallconversation: builder.query({
      query: () => ({
        url: "/api/v1/agent/getallconversation",
        method: "GET",
      }),
      providesTags:["conver","send"]
    }),



    getsingleconversation: builder.query({
      query: (id) => ({
        url: `/api/v1/agent/getconversationbyid/${id}`,
        method: "GET",

      }),
      providesTags:["send"]
    }),





    // Update the endpoint as needed

    //
  }),
});

export const { useCreateconversationMutation, useGetsingleconversationQuery,useSendpromptMutation ,useGetallconversationQuery} = agentApi;

export default agentApi;
