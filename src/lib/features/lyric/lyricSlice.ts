import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeStuff } from "~/app/page";

// Define a type for the slice state
export interface LyricState {
  lyrics: string;
  lineBefore: string;
  randomLine: string;
  lineAfter: string;
}

// Define the initial state using that type
const initialState: LyricState = {
  lyrics: "",
  lineBefore: "",
  randomLine: "",
  lineAfter: "",
};

export const lyricSlice = createSlice({
  name: "lyric",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateLyrics: (state, action: PayloadAction<string>) => {
      state.lyrics = action.payload;

      const splitLyrics: string[] = action.payload
        .split("\n")
        .filter((line) => line);
      const randomIndex: number = Math.floor(
        Math.random() * splitLyrics.length,
      );

      const newLine = removeStuff(splitLyrics[randomIndex]) ?? "Ope";

      state.lineBefore = splitLyrics[randomIndex - 1] ?? "Ope";
      state.randomLine = newLine;
      state.lineAfter = splitLyrics[randomIndex + 1] ?? "Ope";
    },
  },
});

export const { updateLyrics } = lyricSlice.actions;

export default lyricSlice.reducer;
