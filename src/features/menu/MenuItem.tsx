import React from "react";
import Button from "../../components/Button.tsx";
import { addItemToCart } from "../cart/cartSlice.ts";
import { CartItemType, MenuType } from "../../types/types.ts";
import { toggleFavorite } from "./menuSlice.ts";
import { useAppDispatch } from "../../app/storeHooks.ts";

interface MenuItemProps {
    item: MenuType;
}

function MenuItem({ item, }: MenuItemProps) {
    const cartItem: CartItemType = { ...item, quantity: 1 };
    const dispatch = useAppDispatch();

    return (
        <div className="menu-item">
            <div className="item-content">
                <div className="item-header">
                    <h3>{item.title}</h3>
                    <div className={"favorite-marker noselect"} onClick={() => dispatch(toggleFavorite(item.id))}>{item.favorite ? "❤️" : "♡"}</div>
                </div>
                {item.price} €
                <div className="item-description">
                    {item.description}
                </div>
            </div>
            <Button action={addItemToCart(cartItem)}
                className="add-to-cart-btn"
            >
                +
            </Button>
            {/* <div className="item-picture">
                <img src="https://via.placeholder.com/70" alt="placeholder" />
            </div> */}
        </div>
    );
}

export default MenuItem;

