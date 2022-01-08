import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setUser, clearCredentials } from './auth/authSlice';

const URL = 'https://connections-api.herokuapp.com';

export const phonebookApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['contacts', 'user'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['contacts'],
      keepUnusedDataFor: 10,
    }),

    getCurrentUser: builder.query({
      async queryFn(__, queryApi, _, baseQuery) {
        const persistedToken = queryApi.getState().auth.token;
        if (persistedToken === null) {
          return { data: 'no token' };
        }
        try {
          const respons = await baseQuery('/users/current');
          queryApi.dispatch(setUser(respons.data));
          return respons;
        } catch (error) {
          return { data: error };
        }
      },
      providesTags: ['user'],
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

    registerUser: builder.mutation({
      query: user => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['contacts'],
    }),

    loginUser: builder.mutation({
      query: user => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const respons = await queryFulfilled;

          dispatch(setCredentials(respons.data));
        } catch ({ error }) {
          return error.status;
        }
      },
      invalidatesTags: ['contacts'],
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(clearCredentials());
      },
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useGetCurrentUserQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
} = phonebookApi;
