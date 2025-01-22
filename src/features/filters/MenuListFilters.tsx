import React, { JSX, use, useEffect, useRef, useState } from "react";
import { selectFilters, selectMenusBasedOnFilters, setFilter } from "./filterSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks.ts";

import { groupMenusByType } from "../../utils/menuUtils.ts";
import { useCurrentMenuType } from "../../app/hooks.ts";

import CategoryFilter from "./CategoryFilter.tsx";
import "../../styles/Filter.css";

interface MenuListFiltersProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

function MenuListFilters({ containerRef }: MenuListFiltersProps): JSX.Element {
    const [filterText, setFilterText] = useState("");

    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    const currentMenu = useAppSelector(selectMenusBasedOnFilters);
    const currentMenuCount = currentMenu.length;

    const groupedMenus = groupMenusByType(currentMenu);
    const currentMenuType = useCurrentMenuType(Object.keys(groupedMenus), containerRef);

    async function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        setFilterText(e.target.value);
        dispatch(setFilter({ "search": e.target.value }));
    }

    async function clearFilter(): Promise<void> {
        setFilterText("");
        dispatch(setFilter({ "search": "" }));
    }

    return (
        <div className="menu-filters">
            <div id="filter-wrapper">
                <div>
                    <input
                        type="text"
                        onChange={handleFilterChange}
                        value={filterText}
                        placeholder="Search"
                    />
                    <button onClick={clearFilter}>Clear</button>
                </div>
                <button onClick={() => dispatch(setFilter({ "favorite": !filters.favorite }))}>
                    {filters.favorite ? "Show All" : "Show Favorites"}
                </button>

                {currentMenuCount}
            </div>
            <div id="category-filter-wrapper">
                {
                    Object.keys(groupedMenus).map((type) => (
                        <CategoryFilter key={type} type={type} active={currentMenuType === type} />
                    ))
                }
            </div>
        </div>
    );
}

export default MenuListFilters;