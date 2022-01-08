import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://61d73c4b35f71e0017c2eab8.mockapi.io/api/v1/';

export const phonebookApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  tagTypes: ['contacts'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['contacts'],
    }),

    addContact: builder.mutation({
      query: contact => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = phonebookApi;
