import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import cartSlice from "./cartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
