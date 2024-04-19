/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getLyrics } from "~/server/api_calls";
import MissingWord from "./missing_word";
import { Button } from "~/components/ui/button";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  loaded,
  loading,
  setArtist,
  setSong,
  updateLyrics,
} from "~/lib/features/lyric/lyricSlice";
import {
  decreaseTimer,
  gainScore,
  lostLife,
  reset as resetLogic,
  resetTimer,
  setEndGame,
  setFormLoading,
  setScoring,
} from "~/lib/features/logic/logicSlice";
import Loading from "~/components/common/Loading";
import type { AppDispatch } from "~/lib/store";
import EndGame from "~/app/(score layour)/_components/EndGame";

export default function GameLoop({
  artist: serverArtist,
  song: serverSong,
  songs,
  serverIndex,
  initalLyrics,
}: {
  artist: string;
  song?: string;
  songs?: string[];
  serverIndex?: number;
  initalLyrics: string;
}) {
  //Values from Redux
  const {
    isLoading,
    lineBefore,
    randomLine,
    lineAfter,
    song,
    artist,
  }: {
    isLoading: boolean;
    lineBefore: string;
    randomLine: string;
    lineAfter: string;
    song: string;
    artist: string;
  } = useAppSelector((state) => state.lyric);

  const {
    timer,
    scoring,
    life,
    endGame,
    formLoading,
  }: {
    timer: number;
    scoring: boolean;
    life: number;
    endGame: boolean;
    formLoading: boolean;
  } = useAppSelector((state) => state.logic);

  //State Values
  const [valueArray, setValueArray] = useState<string[]>([]);
  const [invalidIndexes, setInvalidIndexes] = useState<number[]>([]);

  const clock = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      dispatch(setScoring(true));
      dispatch(lostLife());

      if (life !== 1) {
        setTimeout(() => {
          void getNewLyric();
        }, 2000);
      }
    }
  }, [timer]);

  useEffect(() => {
    setValueArray(new Array(randomLine?.split(" ").length).fill(""));

    dispatch(resetTimer());

    clock.current = startTimer(dispatch);

    return () => {
      if (clock.current) pauseTimer(clock.current);
    };
  }, [randomLine]);

  useEffect(() => {
    if (life <= 0) {
      dispatch(setEndGame(true));
      if (clock.current) pauseTimer(clock.current);
    }
  }, [life]);

  const getNewLyric = async () => {
    dispatch(loading());
    dispatch(setScoring(false));
    setValueArray([]);
    setInvalidIndexes([]);

    let data;
    let newSong;

    if (!serverSong && !songs) return;

    if (serverSong !== undefined) {
      data = await getLyrics(artist, song);
      newSong = song;
    } else if (songs) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      if (!randomSong) return;
      data = await getLyrics(artist, randomSong);
      newSong = randomSong;
    }

    if (!data || !newSong) return;

    dispatch(updateLyrics(data.lyrics));
    dispatch(setSong(newSong));

    dispatch(loaded());
  };

  const reset = () => {
    dispatch(loading());

    if (serverSong) dispatch(setSong(serverSong));
    if (songs) dispatch(setSong(songs[serverIndex ?? 0] ?? ""));

    dispatch(resetLogic());
    setValueArray([]);
    setInvalidIndexes([]);
    dispatch(updateLyrics(initalLyrics));

    dispatch(setArtist(serverArtist));
    dispatch(loaded());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formLoading) return;

    setFormLoading(true);

    dispatch(setScoring(true));

    if (clock.current) pauseTimer(clock.current);

    if (!randomLine) return;

    const cleanLineArray = randomLine
      ?.replace(/[\[\](),.!?']/g, "")
      .toLowerCase()
      .split(" ");

    const cleanValueArray = valueArray.map((word) => word.toLowerCase());

    const invalidIndex: number[] = [];

    cleanLineArray.forEach((word, index) => {
      if (word !== cleanValueArray[index]) {
        invalidIndex.push(index);
      }
    });

    setInvalidIndexes(invalidIndex);

    let gameOver = false;

    if (invalidIndex.length === 0) {
      dispatch(gainScore(1));
    } else {
      dispatch(lostLife());

      if (life === 1) {
        gameOver = true;
      }
    }

    if (!gameOver) {
      setTimeout(() => {
        setFormLoading(false);
        void getNewLyric();
      }, 2000);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col items-center justify-center gap-8 text-4xl font-semibold"
    >
      <div className="">{lineBefore}</div>
      <div className="flex w-full max-w-2xl flex-wrap justify-center gap-8 px-4">
        {randomLine?.split(" ").map((word, index) => (
          <MissingWord
            key={`${word}-${index}`}
            invalid={invalidIndexes.includes(index)}
            disabled={scoring}
            word={word}
            handleChange={(value: string, letterIndex: number) => {
              const newValueArray = [...valueArray];
              const splitValue = newValueArray[index]?.split("");

              if (!splitValue) return;

              splitValue[letterIndex] = value;

              newValueArray[index] = splitValue.join("");
              setValueArray(newValueArray);
            }}
          />
        ))}
      </div>
      <div>{lineAfter}</div>
      <Button type="submit" className="w-[250px]">
        {formLoading ? <>Scoring...</> : "Submit"}
      </Button>

      {scoring && (
        <div className=" absolute bottom-2 rounded-sm border bg-zinc-600 p-4">
          {randomLine}
        </div>
      )}

      <EndGame valueArray={valueArray} open={endGame} reset={reset} />
    </form>
  );
}

export const startTimer = (dispatch: AppDispatch) => {
  const interval = setInterval(() => {
    dispatch(decreaseTimer());
  }, 1000);

  return interval;
};

export const pauseTimer = (timer: NodeJS.Timeout) => {
  clearInterval(timer);
};
