import { configureStore } from '@reduxjs/toolkit';
import { phonebookApi } from './phonebook';
import { filter } from './reducer';

export const store = configureStore({
  reducer: {
    filter,
    [phonebookApi.reducerPath]: phonebookApi.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    phonebookApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});
