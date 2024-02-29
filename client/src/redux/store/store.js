import { configureStore,combineReducers } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice.js";
import {persistReducer} from "redux-persist";
import storage from "reduc-persist/lib/storage";
import persistStore from 'redux-persist/es/persistStore';




const rootReducer=combineReducers({
  auth:authReducer
})

const persistConfig={
  key:"root",
  storage,
  version:1
}

const persistedReducer=persistReducer(persistConfig,rootReducer);




export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>{
    getDefaultMiddleware({serializableCheck:false})
  }
})

export const persistor=persistStore(store);