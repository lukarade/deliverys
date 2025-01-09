import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/storeHooks.ts";
import { selectAllMenus, fetchMenu, selectLoadingStatus } from "./menuSlice.ts";
import { MenuLoadingStatus } from "../../constances.ts";
import MenuItem from "./MenuItem.tsx";

import "../../styles/Menu.css";

function MenuList() {
    const dispatch = useAppDispatch();
    const menus = useAppSelector(selectAllMenus);
    const loadingStatus = useAppSelector(selectLoadingStatus);

    useEffect(() => {
        if (loadingStatus === MenuLoadingStatus.IDLE) {
            dispatch(fetchMenu());
        }
    }, [dispatch, loadingStatus]);


    return (
        <div className="menu-list">
            <h2>Menu List</h2>

            {loadingStatus === MenuLoadingStatus.LOADING ? (
                <p>Loading...</p>
            ) : loadingStatus === MenuLoadingStatus.FAILED ? (
                <p>Error loading menus</p>
            ) : menus.length === 0 ? (
                <p>No menu available</p>
            ) : (
                menus.map((item) => (
                    <li key={item.id}>
                        <MenuItem item={item} />
                    </li>
                ))
            )}

        </div>
    );
}

export default MenuList;