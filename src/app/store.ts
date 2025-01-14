import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice.ts";
import cartReducer from "../features/cart/cartSlice.ts";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedMenuReducer = persistReducer(persistConfig, menuReducer);

const store = configureStore({
    reducer: {
        menu: persistedMenuReducer,
        cart: persistedCartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);

export default store;