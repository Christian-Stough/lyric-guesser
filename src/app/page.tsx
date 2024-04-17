import { type LyricsData, getLyrics } from "~/server/api_calls";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Fragment } from "react";

export default async function HomePage() {
  const data: LyricsData = await getLyrics();

  const splitLyrics: string[] = data.lyrics.split("\n").filter((line) => line);

  const randomIndex: number = Math.floor(Math.random() * splitLyrics.length);

  const lineBeforeRandom: string = splitLyrics[randomIndex - 1] ?? "Ope";
  const randomLine: string = removeStuff(splitLyrics[randomIndex]) ?? "Ope";
  const lineAfterRandom: string = splitLyrics[randomIndex + 1] ?? "Ope";

  const rlWords: string[] = randomLine.split(" ");

  let runningLength = 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-4xl font-semibold">
      <div className="">{lineBeforeRandom}</div>
      <InputOTP
        maxLength={1000}
        className="flex max-w-full flex-wrap gap-8"
        pattern={"^[a-zA-Z0-9]+$"}
      >
        {rlWords.flatMap((word: string, wordIndex: number, arr: string[]) => {
          // Split the word at the apostrophe
          const parts = word.split("'");

          const groups = parts.flatMap((part, partIndex) => {
            const splitPart: string[] = part.split("");
            const partLength = part.length;

            const elements = splitPart.map(
              (letter: string, letterIndex: number) => {
                const relativeIndex = runningLength + letterIndex;
                return (
                  <InputOTPSlot index={relativeIndex} key={relativeIndex} />
                );
              },
            );

            runningLength += partLength;

            // If this is the last part, don't add an apostrophe after it
            if (partIndex === parts.length - 1) {
              return [
                <InputOTPGroup key={`${word}-${partIndex}`}>
                  {elements}
                </InputOTPGroup>,
              ];
            }

            // Otherwise, add an apostrophe after the group
            return [
              <InputOTPGroup key={`${word}-${partIndex}`}>
                {elements}
              </InputOTPGroup>,
              <div
                key={`apostrophe-${wordIndex}-${partIndex}`}
                className="-translate-y-4"
              >
                &apos;
              </div>,
            ];
          });

          // If this is the last word, don't add a separator after it
          if (wordIndex === arr.length - 1) {
            return groups;
          }

          // Otherwise, add a separator after the groups
          return [
            ...groups,
            <InputOTPSeparator key={`separator-${wordIndex}`} />,
          ];
        })}
      </InputOTP>
      <div>{lineAfterRandom}</div>
      <div>{randomLine}</div>
    </div>
  );
}

const removeStuff = (str: string | undefined): string => {
  if (!str) return "Ope";
  return str.replace(/[\[\](),.!?]/g, "");
};
