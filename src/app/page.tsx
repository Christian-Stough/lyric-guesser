"use client";

import { useEffect, useState } from "react";
import { getLyrics } from "~/server/api_calls";
import MissingWord from "./_components/missing_word";
import { Button } from "~/components/ui/button";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { loaded, loading, updateLyrics } from "~/lib/features/lyric/lyricSlice";
import {
  decreaseTimer,
  gainScore,
  lostLife,
  resetTimer,
} from "~/lib/features/logic/logicSlice";
import Loading from "~/components/common/Loading";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const [valueArray, setValueArray] = useState<string[]>([]);

  const { isLoading } = useAppSelector((state) => state.lyric);

  const {
    lineBefore,
    randomLine,
    lineAfter,
  }: { lineBefore: string; randomLine: string; lineAfter: string } =
    useAppSelector((state) => state.lyric);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void getNewLyric();
  }, []);

  useEffect(() => {
    dispatch(resetTimer());

    const timer = setInterval(() => {
      dispatch(decreaseTimer());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [randomLine]);

  useEffect(() => {
    setValueArray(new Array(randomLine?.split(" ").length).fill(""));
  }, [randomLine]);

  const getNewLyric = async () => {
    dispatch(loading());

    const data = await getLyrics();

    dispatch(updateLyrics(data.lyrics));

    dispatch(loaded());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!randomLine) return;

    const cleanLine = randomLine?.replace(/[\[\](),.!?']/g, "").toLowerCase();

    const doTheyMatch: boolean =
      cleanLine === valueArray.join(" ").toLowerCase();

    //setInvalidIndexes(newInvalidIndexes);

    if (doTheyMatch) {
      dispatch(gainScore(1));
    } else {
      dispatch(lostLife());
    }

    void getNewLyric();
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
            invalid={false}
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
      <div className=" absolute bottom-2 rounded-sm border bg-zinc-600 p-4">
        {randomLine}
      </div>
    </form>
  );
}
