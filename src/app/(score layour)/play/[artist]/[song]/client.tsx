/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import GameLoop from "~/app/(score layour)/_components/GameLoop";

export default function ArtistSongClient({
  artist,
  song,
  initalLyrics,
}: {
  artist: string;
  song: string;
  initalLyrics: string;
}) {
  return <GameLoop artist={artist} song={song} initalLyrics={initalLyrics} />;
}
