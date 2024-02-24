import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../features/authSlice.js";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// export const store = configureStore({
//   reducer: {
//    auth:authReducer
//   }
// })

const persistConfig = {
  key: 'root',
  storage,
  // Specify the reducers you want to persist
  whitelist: ['user'], // In this example, we persist the 'user' reducer
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);

