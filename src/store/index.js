import { configureStore } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react";
import {Provider} from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import authReducer from "./authSlice";
const persistConfig = {
  key:"auth",
  storage
}
const persistedAuthReducer = persistReducer(persistConfig,authReducer)
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});
const persistor = persistStore(store)
export {store,persistor};
