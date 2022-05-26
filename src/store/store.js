import { configureStore } from '@reduxjs/toolkit';
import paintingsSlice from './slices/paintingsSlice';

const reducer = {
  paintings: paintingsSlice,
};

export const store = configureStore({
  reducer,
});
