import { getArtists } from "~/server/queries";
import ArtistSelectionClient from "./client";
import type { Artist } from "~/lib/artists";

export default async function ArtistPage() {
  const artists = await getArtists().then((res) =>
    res.sort((a, b) => a.id - b.id),
  );

  const formattedArtists: Artist[] = artists.map((artist) => ({
    ...artist,
    songs: [artist.songs], // Convert songs to an array
  }));

  return <ArtistSelectionClient artists={formattedArtists} />;
}
