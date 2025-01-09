import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/storeHooks.ts";
import { selectMenu, fetchMenu } from "./menuSlice.ts";

function MenuList() {
    const dispatch = useAppDispatch();
    const menus = useAppSelector(selectMenu);

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);


    return (
        <div>
            <h2>Menu List</h2>
            {menus.length === 0 ? <p>No menu available</p> :
                menus.map((menu, index) => (
                    <div key={index}>
                        <h3>{menu.title}</h3>
                        <p>{menu.description}</p>
                        <p>{menu.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default MenuList;