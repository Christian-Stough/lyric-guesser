import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface LogicState {
  life: number;
  score: number;
  timer: number;
}

// Define the initial state using that type
const initialState: LogicState = {
  life: 3,
  score: 0,
  timer: 10,
};

export const logicSlice = createSlice({
  name: "logic",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    lostLife: (state) => {
      state.life -= 1;
    },
    gainScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    decreaseTimer: (state) => {
      state.timer -= 1;
    },
    resetTimer: (state) => {
      state.timer = 10;
    },
  },
});

export const { lostLife, gainScore, decreaseTimer, resetTimer } =
  logicSlice.actions;

export default logicSlice.reducer;
