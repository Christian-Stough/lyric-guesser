"use client";

import React from "react";
import { useAppSelector } from "~/lib/hooks";

export default function TopNav() {
  const { life, score, timer } = useAppSelector((state) => state.logic);
  const { artist, song } = useAppSelector((state) => state.lyric);

  return (
    <div className="flex h-10 w-full justify-between p-4">
      <div className="flex gap-8">
        <div className="flex gap-1">
          <span className="text-2xl font-semibold">❤️</span>
          <span className="text-2xl font-semibold">{life}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-2xl font-semibold">🎯</span>
          <span className="text-2xl font-semibold">{score}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-2xl font-semibold">⏰</span>
          <span className="text-2xl font-semibold">{timer}</span>
        </div>
      </div>

      <div className="flex h-fit flex-col items-end justify-center gap-0.5 ">
        <span className="text-2xl font-semibold">
          {song.replaceAll("%20", " ")}
        </span>
        <span className="text-lg text-slate-400">
          {artist.replaceAll("%20", " ")}
        </span>
      </div>
    </div>
  );
}
