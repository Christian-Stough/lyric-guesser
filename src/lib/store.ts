import { configureStore } from "@reduxjs/toolkit";
import logicReducer from "./features/logic/logicSlice";
import lyricReducer from "./features/lyric/lyricSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      logic: logicReducer,
      lyric: lyricReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
