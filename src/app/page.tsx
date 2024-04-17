"use client";

import { useEffect, useState } from "react";
import { getLyrics } from "~/server/api_calls";
import MissingWord from "./_components/missing_word";
import { Button } from "~/components/ui/button";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const [lyrics, setLyrics] = useState<string>();
  const [lineBefore, setLineBefore] = useState<string>();
  const [lineAfter, setLineAfter] = useState<string>();
  const [randomLine, setRandomLine] = useState<string>();
  const [valueArray, setValueArray] = useState<string[]>([]);

  useEffect(() => {
    void updateLyrics();
  }, []);

  const updateLyrics = async () => {
    const data = await getLyrics();

    const splitLyrics: string[] = data.lyrics
      .split("\n")
      .filter((line) => line);
    const randomIndex: number = Math.floor(Math.random() * splitLyrics.length);

    const newLine = removeStuff(splitLyrics[randomIndex]) ?? "Ope";

    setLineBefore(splitLyrics[randomIndex - 1] ?? "Ope");
    setRandomLine(newLine);
    setLineAfter(splitLyrics[randomIndex + 1] ?? "Ope");
    setLyrics(data.lyrics);

    setValueArray(new Array(newLine?.split(" ").length).fill(""));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanLine = randomLine?.replace(/[\[\](),.!?']/g, "").toLowerCase();
    const submittedLine = valueArray.join(" ").toLowerCase();

    console.log(cleanLine);
    console.log(submittedLine);
    console.log(cleanLine === submittedLine);
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

const removeStuff = (str: string | undefined): string => {
  if (!str) return "Ope";
  return str.replace(/[\[\](),.!?]/g, "");
};
