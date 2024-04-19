import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const INITALLIFES = 3;
const INITALTIMER = 45;

// Define a type for the slice state
export interface LogicState {
  life: number;
  score: number;
  timer: number;
  scoring: boolean;
  endGame: boolean;
  formLoading: boolean;
}

// Define the initial state using that type
const initialState: LogicState = {
  life: INITALLIFES,
  score: 0,
  timer: INITALTIMER,
  scoring: false,
  endGame: false,
  formLoading: false,
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
    resetScore: (state) => {
      state.score = 0;
    },
    resetLife: (state) => {
      state.life = INITALLIFES;
    },
    decreaseTimer: (state) => {
      state.timer -= 1;
    },
    resetTimer: (state) => {
      state.timer = INITALTIMER;
    },
    setScoring: (state, action: PayloadAction<boolean>) => {
      state.scoring = action.payload;
    },
    setEndGame: (state, action: PayloadAction<boolean>) => {
      state.endGame = action.payload;
    },
    setFormLoading: (state, action: PayloadAction<boolean>) => {
      state.formLoading = action.payload;
    },
    reset: (state) => {
      state.scoring = false;

      state.endGame = false;
      state.formLoading = false;
      state.timer = INITALTIMER;
      state.life = INITALLIFES;
      state.score = 0;
    },
  },
});

export const {
  lostLife,
  gainScore,
  decreaseTimer,
  resetTimer,
  resetLife,
  resetScore,
  setScoring,
  setEndGame,
  setFormLoading,
  reset,
} = logicSlice.actions;

export default logicSlice.reducer;
