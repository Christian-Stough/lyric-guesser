"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useAppSelector } from "~/lib/hooks";

export default function EndGame({
  open,
  valueArray,
  reset,
}: {
  open: boolean;
  valueArray: string[];
  reset: () => void;
}) {
  let { artist, song }: { artist: string; song: string } = useParams();

  const { score } = useAppSelector((state) => state.logic);

  const { lineBefore, lineAfter, randomLine } = useAppSelector(
    (state) => state.lyric,
  );

  artist = artist.replaceAll("%20", " ");
  song = song.replaceAll("%20", " ");

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{song}</DialogTitle>
          <DialogDescription>{artist}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full text-center text-3xl font-semibold">
            Better Luck Next Time...
          </div>
          <Card className="h-fit w-fit bg-slate-800 p-4">
            <CardHeader className="p-0">
              <div className=" text-center text-2xl font-semibold">{score}</div>
            </CardHeader>
          </Card>
          <div className="w-full text-center text-2xl font-semibold">
            The Line the That Ended Your Run Was...
          </div>
          <div className="text-md flex flex-col items-center gap-2 text-slate-400">
            <div>{lineBefore}</div>
            <div className="text-xl font-semibold text-slate-400 line-through decoration-1">
              {valueArray.join(" ")}
            </div>
            <div className="text-xl font-semibold text-red-600">
              {randomLine}
            </div>
            <div>{lineAfter}</div>
          </div>
        </div>
        <DialogFooter className="flex w-full !justify-around pt-4">
          <Button className="w-1/2" onClick={() => reset()}>
            Play Again
          </Button>

          <Button className="w-1/2" variant="secondary">
            <Link href="/">Go Home</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
