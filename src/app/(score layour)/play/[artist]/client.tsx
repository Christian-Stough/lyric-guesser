import React from "react";
import GameLoop from "../../_components/GameLoop";

export default function ArtistClient({
  artist,
  initalLyrics,
  songs,
}: {
  artist: string;
  initalLyrics: string;
  songs: string[];
}) {
  return <GameLoop songs={songs} artist={artist} initalLyrics={initalLyrics} />;
}
