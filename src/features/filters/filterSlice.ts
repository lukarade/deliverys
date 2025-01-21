import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { MenuFilterType, MenuType } from "../../types/types.ts";

interface FilterState {
    filters: MenuFilterType;
}

const initialState: FilterState = {
    filters: {
        type: "all",
        sort: "asc",
        price: -1,
        favorite: false,
        search: "",
    },
};


const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<MenuFilterType>) => {
            state.filters = action.payload;
        },
        setFilter: (state, action: PayloadAction<Partial<MenuFilterType>>) => {
            state.filters = { ...state.filters, ...action.payload };


        }
    },
});

// Reducers
export const { setFilters, setFilter } = filterSlice.actions;

// Selectors
export const selectFilters = (state: { filter: FilterState }) => state.filter.filters;

export const selectAllMenus = (state: RootState) => state.menu.menus;
export const selectMenusBasedOnFilters = createSelector(
    [selectAllMenus, selectFilters],
    (menus, filters) => {
        return menus.filter(menu => {
            // Apply the filters to the menu items
            if (filters.favorite && !menu.favorite) {
                return false;
            }
            if (filters.search && !menu.title.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            return true;
        });
    }
);

export default filterSlice.reducer;