import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store.ts';

import { MenuType } from '../../types/menuTypes.ts';

interface MenuState {
    menus: any[];
}

const initialState: MenuState = {
    menus: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<MenuType[]>) => {
            state.menus = action.payload;
        },
    },
});

// Thunks
export const fetchMenu = (): AppThunk => async (dispatch) => {
    const response = await fetch('http://localhost:8000/menus');
    const data = await response.json() as MenuType[];
    dispatch(setMenu(data));
};

// Reducers
export const { setMenu } = menuSlice.actions;

// Selectors
export const selectMenu = (state: { menu: MenuState }): MenuType[] => state.menu.menus;


export default menuSlice.reducer;