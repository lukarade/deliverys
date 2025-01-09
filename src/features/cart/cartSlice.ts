import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItemType } from '../../types/types.ts';

interface CartState {
    cartItems: CartItemType[];
}

const initialState: CartState = {
    cartItems: [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItemType>) => {
            // Check quantity of item in cart to not add duplicate item
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
                return;
            }
            state.cartItems.push({ ...action.payload, quantity: 1 });
        },
        deleteItemFromCart: (state, action: PayloadAction<CartItemType>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        },
        increaseOrDecreaseQuantity: (state, action: PayloadAction<{ id: number; amount: number }>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                if (item.quantity !== undefined) {
                    item.quantity += action.payload.amount;
                } else {
                    item.quantity = action.payload.amount;
                }
                // Remove item from cart if quantity is 0 or less
                if (item.quantity <= 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                }
            }
        },
        checkoutCart: (state) => {
            alert('Checkout with total of ' + selectTotalPrice({ cart: state }) + ' €');
            // Checkout logic here
            state.cartItems = [];
        },
    },
});

// Thunks


// Reducers
export const { addItemToCart, deleteItemFromCart, increaseOrDecreaseQuantity, checkoutCart } = cartSlice.actions;

// Selectors
export const selectAllCartItems = (state: { cart: CartState }): CartItemType[] => state.cart.cartItems;
export const selectTotalPrice = (state: { cart: CartState }): number => parseFloat(state.cart.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2));

export default cartSlice.reducer;