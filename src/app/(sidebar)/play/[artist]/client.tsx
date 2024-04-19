"use client";

import { useEffect, useState } from "react";
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

export const dynamic = "force-dynamic";

export default function PlayClient({
  artist,
  initalLyrics,
}: {
  artist: string;
  initalLyrics: string;
}) {
  const [valueArray, setValueArray] = useState<string[]>([]);

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

  const { timer, scoring }: { timer: number; scoring: boolean } =
    useAppSelector((state) => state.logic);

  const [invalidIndexes, setInvalidIndexes] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScoring(false));
    dispatch(loading());
    dispatch(updateLyrics(initalLyrics));
    dispatch(resetTimer());
    dispatch(resetLife());
    dispatch(resetScore());
    dispatch(loaded());
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

    const clock = setInterval(() => {
      dispatch(decreaseTimer());
    }, 1000);

    return () => {
      clearInterval(clock);
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

    const data = await getLyrics(artist);

    dispatch(updateLyrics(data.lyrics));

    dispatch(loaded());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setScoring(true));

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

    if (invalidIndex.length === 0) {
      dispatch(gainScore(1));
    } else {
      dispatch(lostLife());
    }

    setTimeout(() => {
      void getNewLyric();
    }, 2000);
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
    </form>
  );
}
