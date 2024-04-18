import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface LogicState {
  life: number;
  score: number;
}

// Define the initial state using that type
const initialState: LogicState = {
  life: 3,
  score: 0,
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
  },
});

export const { lostLife, gainScore } = logicSlice.actions;

export default logicSlice.reducer;
