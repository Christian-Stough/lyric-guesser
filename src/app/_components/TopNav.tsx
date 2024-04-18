"use client";

import React from "react";
import { useAppSelector } from "~/lib/hooks";

export default function TopNav() {
  const { life, score, timer } = useAppSelector((state) => state.logic);

  return (
    <div className="flex h-10 w-full justify-between">
      <div className="flex gap-4">
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
    </div>
  );
}
