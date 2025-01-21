import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/storeHooks.ts";
import { fetchMenu, selectLoadingStatus } from "./menuSlice.ts";
import { MenuLoadingStatus } from "../../constances.ts";
import { selectMenusBasedOnFilters } from "../filters/filterSlice.ts";
import { capitalizeFirstLetter, groupMenusByType } from "../../utils/menuUtils.ts";
import MenuItem from "./MenuItem.tsx";
import Button from "../../components/Button.tsx";

import "../../styles/Menu.css";

function MenuList() {
    const [loadedItems, setLoadedItems] = useState(100);

    const dispatch = useAppDispatch();
    const menus = useAppSelector(selectMenusBasedOnFilters);
    const loadingStatus = useAppSelector(selectLoadingStatus);
    const groupedMenus = groupMenusByType(menus);


    useEffect(() => {
        if (loadingStatus === MenuLoadingStatus.IDLE) {
            dispatch(fetchMenu());
        }
    }, [dispatch, loadingStatus]);

    async function showMore() {
        if (loadedItems < menus.length) {
            setLoadedItems(loadedItems + 10);
        }
    }

    return (
        <div className="menu-list">
            {loadingStatus === MenuLoadingStatus.LOADING ? (
                <p>Loading...</p>
            ) : loadingStatus === MenuLoadingStatus.FAILED ? (
                <p>Error loading menus</p>
            ) : menus.length === 0 ? (
                <p>No menu available</p>
            ) : (
                Object.keys(groupedMenus).map((type) => (
                    <div key={type} id={type}>
                        <h3>{capitalizeFirstLetter(type)}</h3>
                        {groupedMenus[type].slice(0, loadedItems).map((menu) => (
                            <MenuItem key={menu.id} item={menu} />
                        ))}
                    </div>
                ))
            )}
            {loadedItems < menus.length && (
                <div className="more-btn-container">
                    <Button className="more-btn" action={() => showMore()}>More</Button>
                </div>
            )}
        </div>
    );
}

export default MenuList;