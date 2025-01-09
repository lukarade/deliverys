import React from 'react';

import { useAppSelector } from '../../app/storeHooks.ts';
import { selectAllCartItems, selectTotalPrice, checkoutCart } from './cartSlice.ts';

import '../../styles/Cart.css';
import Button from '../../components/Button.tsx';
import CartItem from './CartItem.tsx';

function ShoppingCart() {
    const cart = useAppSelector(selectAllCartItems);

    const totalPrice = useAppSelector(selectTotalPrice);

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.id}>
                            <CartItem item={item} />
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: {totalPrice}</p>
            <Button action={checkoutCart()} className="checkout-btn">Checkout</Button>
        </div>
    );
}

export default ShoppingCart;