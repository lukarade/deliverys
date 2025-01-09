import React from "react";
import Button from "../../components/Button.tsx";
import { addItemToCart } from "../cart/cartSlice.ts";
import { MenuType } from "../../types/types.ts";

interface MenuItemProps {
    item: MenuType;
}

function MenuItem({ item }: MenuItemProps) {
    return (
        <div className="menu-item">
            <div className="item-content">
                <h3>{item.title}</h3>
                {item.price} €

                <div className="item-description">
                    {item.description}
                </div>
            </div>
            <Button action={addItemToCart(item)}
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

