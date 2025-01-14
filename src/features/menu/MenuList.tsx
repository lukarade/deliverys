import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/storeHooks.ts";
import { selectAllMenus, fetchMenu, selectLoadingStatus } from "./menuSlice.ts";
import { MenuLoadingStatus } from "../../constances.ts";
import MenuItem from "./MenuItem.tsx";
import MenueFilters from "./MenuListFilters.tsx";
import Button from "../../components/Button.tsx";

import "../../styles/Menu.css";

function MenuList() {
    const [loadedItems, setLoadedItems] = useState(10);
    const [showFavorites, setShowFavorites] = useState(false);

    const dispatch = useAppDispatch();
    const menus = useAppSelector(selectAllMenus);
    const loadingStatus = useAppSelector(selectLoadingStatus);


    useEffect(() => {
        if (loadingStatus === MenuLoadingStatus.IDLE) {
            dispatch(fetchMenu());
        }
    }, [dispatch, loadingStatus]);

    const showMore = async () => {
        if (loadedItems < filteredMenus.length) {
            setLoadedItems(loadedItems + 10);
        }
    };

    const filteredMenus = showFavorites ? menus.filter(menu => menu.favorite) : menus;

    return (
        <div className="menu-list">
            <h2>Menu List</h2>
            <MenueFilters showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
            {loadingStatus === MenuLoadingStatus.LOADING ? (
                <p>Loading...</p>
            ) : loadingStatus === MenuLoadingStatus.FAILED ? (
                <p>Error loading menus</p>
            ) : filteredMenus.length === 0 ? (
                <p>No menu available</p>
            ) : (
                filteredMenus.slice(0, loadedItems).map((item) => (
                    <li key={item.id}>
                        <MenuItem item={item} />
                    </li>
                ))
            )}
            {loadedItems < filteredMenus.length ? <Button action={() => showMore()}>More</Button> : null}
        </div>
    );
}

export default MenuList;