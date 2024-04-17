"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";

import MissingWord from "./missing_word";

export default function Client({
  lineBeforeRandom,
  randomLine,
  lineAfterRandom,
}: {
  lineBeforeRandom: string;
  randomLine: string;
  lineAfterRandom: string;
}) {
  const lineArray: string[] = randomLine.split(" ");

  const [valueArray, setValueArray] = useState<string[]>(
    new Array(lineArray.length).fill(""),
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-4xl font-semibold">
      <div className="">{lineBeforeRandom}</div>
      <div className="flex w-full max-w-2xl flex-wrap justify-center gap-8 px-4">
        {lineArray.map((word, index) => (
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
      <div>{lineAfterRandom}</div>
      <Button className="w-[250px]">Submit</Button>
      <div className=" absolute top-2 rounded-sm border bg-zinc-600 p-4">
        {valueArray.join(" ")}
      </div>
      <div className=" absolute bottom-2 rounded-sm border bg-zinc-600 p-4">
        {randomLine}
      </div>
    </div>
  );
}
