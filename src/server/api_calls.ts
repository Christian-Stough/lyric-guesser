import "server-only";

export const getLyrics = async (): Promise<LyricsData> => {
  const res = await fetch("https://api.lyrics.ovh/v1/Taylor Swift/Bad Blood");
  const data: LyricsData = (await res.json()) as LyricsData;
  return data;
};

export interface LyricsData {
  lyrics: string;
}
