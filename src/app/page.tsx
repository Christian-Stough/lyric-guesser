"use client";

import { useEffect, useState } from "react";
import { getLyrics } from "~/server/api_calls";
import MissingWord from "./_components/missing_word";
import { Button } from "~/components/ui/button";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { updateLyrics } from "~/lib/features/lyric/lyricSlice";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const [valueArray, setValueArray] = useState<string[]>([]);
  const [invalidIndexes, setInvalidIndexes] = useState<number[]>([]);

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
    setValueArray(new Array(randomLine?.split(" ").length).fill(""));
  }, [randomLine]);

  const getNewLyric = async () => {
    const data = await getLyrics();

    dispatch(updateLyrics(data.lyrics));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!randomLine) return;

    const cleanLineArray: string[] = randomLine
      ?.replace(/[\[\](),.!?']/g, "")
      .toLowerCase()
      .split(" ");

    const newInvalidIndexes = cleanLineArray.reduce(
      (acc: number[], word, index) => {
        if (word !== (valueArray[index]?.toLowerCase() ?? "")) {
          acc.push(index);
        }
        return acc;
      },
      [],
    );

    setInvalidIndexes(newInvalidIndexes);
  };

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

export const removeStuff = (str: string | undefined): string => {
  if (!str) return "Ope";
  return str.replace(/[\[\](),.!?]/g, "");
};
