import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/storeHooks.ts";
import { selectAllMenus, fetchMenu, selectLoadingStatus } from "./menuSlice.ts";
import { MenuLoadingStatus } from "../../constances.ts";
import MenuItem from "./MenuItem.tsx";
import MenueFilters from "./MenuListFilters.tsx";
import Button from "../../components/Button.tsx";

import "../../styles/Menu.css";

function MenuList() {
    const [loadedItems, setLoadedItems] = useState(100);
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

    const groupedMenus = filteredMenus.reduce((acc, menu) => {
        if (!acc[menu.type]) {
            acc[menu.type] = [];
        }
        acc[menu.type].push(menu);
        return acc;
    }, {});

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
                Object.keys(groupedMenus).map((type) => (
                    <div key={type}>
                        <h3>{type}</h3>
                        <ul>
                            {groupedMenus[type].slice(0, loadedItems).map((menu) => (
                                <li key={menu.id}>
                                    <MenuItem item={menu} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            {loadedItems < filteredMenus.length && (
                <div className="more-btn-container">
                    <Button className="more-btn" action={() => showMore()}>More</Button>
                </div>
            )}
        </div>
    );
}

export default MenuList;