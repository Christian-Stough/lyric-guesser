import React from "react";
import GameLoop from "../../_components/GameLoop";

export const dynamic = "force-dynamic";

export default function ArtistClient({
  serverIndex,
  artist,
  initalLyrics,
  songs,
}: {
  serverIndex: number;
  artist: string;
  initalLyrics: string;
  songs: string[];
}) {
  console.log(serverIndex);
  return (
    <GameLoop
      serverIndex={serverIndex}
      songs={songs}
      artist={artist}
      initalLyrics={initalLyrics}
    />
  );
}
