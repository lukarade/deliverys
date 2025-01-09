import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice.ts";
import cartReducer from "../features/cart/cartSlice.ts";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        cart: cartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;