"use server";

export const getLyrics = async (
  artist: string,
  song: string,
): Promise<LyricsData> => {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
  // const res = await fetch(
  //   `https://api.lyrics.ovh/v1/Lil%20Dicky/Pillow%20Talking`,
  // );
  const data: LyricsData = (await res.json()) as LyricsData;

  if (data.lyrics) data.lyrics = data.lyrics.replaceAll("\x92", "'");

  return data;
};

export interface LyricsData {
  lyrics: string;
}
