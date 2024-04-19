import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeStuff } from "~/lib/utils";

// Define a type for the slice state
export interface LyricState {
  isLoading: boolean;
  artist: string;
  song: string;
  lyrics: string;
  lineBefore: string;
  randomLine: string;
  lineAfter: string;
}

// Define the initial state using that type
const initialState: LyricState = {
  artist: "",
  song: "",
  lyrics: "",
  lineBefore: "",
  randomLine: "",
  lineAfter: "",
  isLoading: true,
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

      let newLine: string | undefined;
      let randomIndex = 0;

      while (!newLine) {
        const potentialRandomIndex: number = Math.floor(
          Math.random() * splitLyrics.length,
        );

        const potentialNewLine =
          removeStuff(splitLyrics[potentialRandomIndex]) ?? "Ope";
        const potentialLineBefore =
          splitLyrics[potentialRandomIndex - 1] ?? "Ope";
        const potentialLineAfter =
          splitLyrics[potentialRandomIndex + 1] ?? "Ope";

        const frenchCheck =
          potentialNewLine.includes("Paroles de la chanson") ||
          potentialLineBefore.includes("Paroles de la chanson") ||
          potentialLineAfter.includes("Paroles de la chanson");

        const previousLyricCheck =
          potentialNewLine === state.randomLine ||
          potentialLineBefore === state.lineBefore ||
          potentialLineAfter === state.lineAfter;

        if (frenchCheck || previousLyricCheck) {
          continue;
        } else {
          newLine = potentialNewLine;
          randomIndex = potentialRandomIndex;
        }
      }

      state.lineBefore = splitLyrics[randomIndex - 1] ?? "[Start of Song]";
      state.randomLine = newLine;
      state.lineAfter = splitLyrics[randomIndex + 1] ?? "[End of Song]";
    },
    loading: (state) => {
      state.isLoading = true;
    },
    loaded: (state) => {
      state.isLoading = false;
    },
    setArtist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload;
    },
    setSong: (state, action: PayloadAction<string>) => {
      state.song = action.payload;
    },
  },
});

export const { updateLyrics, loading, loaded, setArtist, setSong } =
  lyricSlice.actions;

export default lyricSlice.reducer;
