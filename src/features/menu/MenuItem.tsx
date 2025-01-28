import React from "react";
import Button from "../../components/Button.tsx";
import { addItemToCart } from "../cart/cartSlice.ts";
import { CartItemType, MenuType } from "../../types/types.ts";
import { toggleFavorite } from "./menuSlice.ts";
import { useAppDispatch } from "../../app/storeHooks.ts";
import { CURRENCY, FAVORITE_OFF, FAVORITE_ON } from "../../constances.ts";

interface MenuItemProps {
    item: MenuType;
}

function MenuItem({ item, }: MenuItemProps) {
    const cartItem: CartItemType = { ...item, quantity: 1 };
    const dispatch = useAppDispatch();

    function handleToggleFavorite() {
        dispatch(toggleFavorite(item.id));
    }

    return (
        <div className="menu-item">
            <div className="item__content">
                <div className="item__header">
                    <h3>{item.title}</h3>
                    <div
                        className={"favorite-marker noselect"}
                        onClick={handleToggleFavorite}
                        typeof="button"
                        aria-label={item.favorite ? "Remove from favorites" : "Add to favorites"}                    >
                        {item.favorite ? FAVORITE_ON : FAVORITE_OFF}
                    </div>
                </div>
                {item.price + CURRENCY}
                <div className="item__description">
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

