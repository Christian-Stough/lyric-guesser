import { getLyrics } from "~/server/api_calls";

import ArtistClient from "./client";
import { type Artist, artists } from "~/lib/artists";

export const dynamic = "force-dynamic";

export default async function PlayPage({
  params,
}: {
  params: { artist: string };
}) {
  if (!params?.artist) {
    return <div>Artist not found</div>;
  }

  const artistObj: Artist | undefined = artists.filter(
    (artist) => artist.name === params.artist.replace(/%20/g, " "),
  )[0];

  if (!artistObj || artistObj.songs.length === 0) {
    return <div>Artist not found</div>;
  }

  const songs = artistObj.songs;

  const randomIndex = 0;

  const lyricsObj = await getLyrics(
    artistObj?.name,
    artistObj?.songs[randomIndex] ?? "",
  );

  return (
    <ArtistClient
      serverIndex={randomIndex}
      songs={songs}
      artist={params.artist}
      initalLyrics={lyricsObj.lyrics}
    />
  );
}
