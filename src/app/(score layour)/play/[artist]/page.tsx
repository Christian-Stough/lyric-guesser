import { getLyrics } from "~/server/api_calls";

import ArtistClient from "./client";
import { type Artist } from "~/lib/artists";
import { getArtists } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function PlayPage({
  params,
}: {
  params: { artist: string };
}) {
  if (!params?.artist) {
    return <div>Artist not found</div>;
  }

  const artists = await getArtists().then((res) =>
    res.sort((a, b) => a.id - b.id),
  );

  const formattedArtists: Artist[] = artists.map((artist) => ({
    ...artist,
    songs: artist.songs.split(","), // Convert songs to an array
  }));

  const artistObj: Artist | undefined = formattedArtists.filter(
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
