import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import cartSlice from "./cartSlice";
import { productAPI } from "@/api/productApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,

    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
