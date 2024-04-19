import { getLyrics } from "~/server/api_calls";
import PlayClient from "./client";

export const dynamic = "force-dynamic";

export default async function PlayPage({
  params,
}: {
  params: { artist: string };
}) {
  const lyricsObj = await getLyrics(params.artist);

  return <PlayClient artist={params.artist} initalLyrics={lyricsObj.lyrics} />;
}
