import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "./store.ts";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ dispatch: AppDispatch, state: RootState }>();