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
  const [valueArray, setValueArray] = useState<string[]>([]);

  const lineArray: string[] = randomLine.split(" ");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-4xl font-semibold">
      <div className="">{lineBeforeRandom}</div>
      <MissingWord lineArray={lineArray} />
      <div>{lineAfterRandom}</div>
      <Button className="w-[250px]">Submit</Button>
      <div className=" absolute top-2 rounded-sm border bg-zinc-600 p-4">
        {randomLine}
      </div>
    </div>
  );
}
