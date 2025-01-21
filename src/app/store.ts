import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice.ts";
import cartReducer from "../features/cart/cartSlice.ts";
import filterReducer from "../features/filters/filterSlice.ts";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistMenuConfig = {
    key: "menu",
    storage,
};
const persistCartConfig = {
    key: "cart",
    storage,
};

const persistedMenuReducer = persistReducer(persistMenuConfig, menuReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);

const store = configureStore({
    reducer: {
        menu: persistedMenuReducer,
        cart: persistedCartReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            }
        }
    ),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);

export default store;