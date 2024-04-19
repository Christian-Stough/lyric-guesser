/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { getLyrics } from "~/server/api_calls";
import MissingWord from "../../../_components/missing_word";
import { Button } from "~/components/ui/button";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { loaded, loading, updateLyrics } from "~/lib/features/lyric/lyricSlice";
import {
  decreaseTimer,
  gainScore,
  lostLife,
  resetLife,
  resetScore,
  resetTimer,
  setScoring,
} from "~/lib/features/logic/logicSlice";
import Loading from "~/components/common/Loading";
import type { AppDispatch } from "~/lib/store";
import EndGame from "~/app/(sidebar)/_components/EndGame";

export const dynamic = "force-dynamic";

export default function PlayClient({
  artist,
  song,
  initalLyrics,
}: {
  artist: string;
  song: string;
  initalLyrics: string;
}) {
  //Values from Redux
  const {
    isLoading,
    lineBefore,
    randomLine,
    lineAfter,
  }: {
    isLoading: boolean;
    lineBefore: string;
    randomLine: string;
    lineAfter: string;
  } = useAppSelector((state) => state.lyric);

  const {
    timer,
    scoring,
    life,
  }: { timer: number; scoring: boolean; life: number } = useAppSelector(
    (state) => state.logic,
  );

  //State Values
  const [valueArray, setValueArray] = useState<string[]>([]);
  const [invalidIndexes, setInvalidIndexes] = useState<number[]>([]);
  const [endGame, setEndGame] = useState<boolean>(false);

  const clock = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      dispatch(setScoring(true));
      dispatch(lostLife());

      setTimeout(() => {
        void getNewLyric();
      }, 2000);
    }
  }, [timer]);

  useEffect(() => {
    dispatch(resetTimer());

    clock.current = startTimer(dispatch);

    return () => {
      if (clock.current) pauseTimer(clock.current);
    };
  }, [randomLine]);

  useEffect(() => {
    setValueArray(new Array(randomLine?.split(" ").length).fill(""));
  }, [randomLine]);

  const getNewLyric = async () => {
    dispatch(loading());
    dispatch(setScoring(false));
    setValueArray([]);
    setInvalidIndexes([]);

    const data = await getLyrics(artist, song);

    dispatch(updateLyrics(data.lyrics));

    dispatch(loaded());
  };

  const reset = () => {
    dispatch(setScoring(false));
    dispatch(loading());
    setEndGame(false);
    setValueArray([]);
    setInvalidIndexes([]);
    dispatch(updateLyrics(initalLyrics));
    dispatch(resetTimer());
    dispatch(resetLife());
    dispatch(resetScore());
    dispatch(loaded());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        setEndGame(true);
      }
    }

    if (!gameOver) {
      setTimeout(() => {
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
        Submit
      </Button>
      <div className=" absolute top-2 rounded-sm border bg-zinc-600 p-4">
        {valueArray.join(" ")}
      </div>
      {scoring && (
        <div className=" absolute bottom-2 rounded-sm border bg-zinc-600 p-4">
          {randomLine}
        </div>
      )}

      <EndGame open={endGame} reset={reset} />
    </form>
  );
}

const startTimer = (dispatch: AppDispatch) => {
  const interval = setInterval(() => {
    dispatch(decreaseTimer());
  }, 1000);

  return interval;
};

const pauseTimer = (timer: NodeJS.Timeout) => {
  clearInterval(timer);
};