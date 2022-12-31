import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import weatherReducer from "./weather-slice";

import { Action } from "redux";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: {
      weather: weatherReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export default store;

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);
