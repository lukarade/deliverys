import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuType } from '../../types/types.ts';
import { createAppAsyncThunk } from '../../app/withTypes.ts';

import { MenuLoadingStatus } from '../../constances.ts';

interface MenuState {
    menus: MenuType[];
    status: MenuLoadingStatus;
    error: string | null;
}

const initialState: MenuState = {
    menus: [],
    status: MenuLoadingStatus.IDLE,
    error: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<MenuType[]>) => {
            state.menus = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.status = MenuLoadingStatus.LOADING;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = MenuLoadingStatus.SUCCEEDED;
                state.menus = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = MenuLoadingStatus.FAILED;
                state.error = action.error.message ? action.error.message : null;
            });
    }
});

// Thunks

export const fetchMenu = createAppAsyncThunk(
    'menu/fetchMenu',
    async () => {
        const response = await fetch('http://localhost:8000/menus');
        await new Promise(resolve => setTimeout(resolve, 300));
        return await response.json() as MenuType[];
    }
);

// Reducers
export const { setMenu } = menuSlice.actions;

// Selectors
export const selectAllMenus = (state: { menu: MenuState }): MenuType[] => state.menu.menus;

export const selectMenuById = (state: { menu: MenuState }, menuId: number): MenuType | undefined => state.menu.menus.find((menu) => menu.id === menuId);
export const selectLoadingStatus = (state: { menu: MenuState }): string => state.menu.status;
export const selectError = (state: { menu: MenuState }): string | null => state.menu.error;

export default menuSlice.reducer;