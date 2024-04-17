import { type LyricsData, getLyrics } from "~/server/api_calls";

import Client from "./_components/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data: LyricsData = await getLyrics();

  const splitLyrics: string[] = data.lyrics.split("\n").filter((line) => line);

  const randomIndex: number = Math.floor(Math.random() * splitLyrics.length);

  const lineBeforeRandom: string = splitLyrics[randomIndex - 1] ?? "Ope";
  const randomLine: string = removeStuff(splitLyrics[randomIndex]) ?? "Ope";
  const lineAfterRandom: string = splitLyrics[randomIndex + 1] ?? "Ope";

  return (
    <Client
      lineBeforeRandom={lineBeforeRandom}
      randomLine={randomLine}
      lineAfterRandom={lineAfterRandom}
    />
  );
}

const removeStuff = (str: string | undefined): string => {
  if (!str) return "Ope";
  return str.replace(/[\[\](),.!?]/g, "");
};
