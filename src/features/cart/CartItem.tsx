import React from "react";
import { CartItemType } from "../../types/types.ts";
import Button from "../../components/Button.tsx";

import { deleteItemFromCart, increaseOrDecreaseQuantity } from "./cartSlice.ts";

interface CartItemProps {
    item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
    const updatedItem = { ...item, quantity: item.quantity || 1 };

    return (
        <div className="cart-item">
            <div className="cart-item-content">
                <div className="item-info">
                    <p>{updatedItem.title}</p>
                    <p>{updatedItem.quantity * updatedItem.price} €</p>
                </div>
                <div className="item-actions">
                    <div className="item-quantity">
                        <Button
                            action={increaseOrDecreaseQuantity({ id: updatedItem.id, amount: -1 })}
                            className="quantity-btn"
                        >
                            -
                        </Button>
                        <p>{updatedItem.quantity}</p>
                        <Button
                            action={increaseOrDecreaseQuantity({ id: updatedItem.id, amount: 1 })}
                            className="quantity-btn"
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        action={deleteItemFromCart(updatedItem)}
                        className="delete-btn"
                    >
                        🗑
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;