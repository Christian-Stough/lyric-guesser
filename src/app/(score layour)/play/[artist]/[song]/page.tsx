import { getLyrics } from "~/server/api_calls";
import PlayClient from "./client";

export const dynamic = "force-dynamic";

export default async function PlayPage({
  params,
}: {
  params: { artist: string; song: string };
}) {
  const lyricsObj = await getLyrics(params.artist, params.song);

  return (
    <PlayClient
      artist={params.artist}
      song={params.song}
      initalLyrics={lyricsObj.lyrics}
    />
  );
}
