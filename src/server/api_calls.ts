"use server";

export const getLyrics = async (artist: string): Promise<LyricsData> => {
  artist = artist.replace("%20", " ");

  //const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/Bad Blood`);
  const res = await fetch(
    `https://api.lyrics.ovh/v1/Lil%20Dicky/Pillow%20Talking`,
  );
  const data: LyricsData = (await res.json()) as LyricsData;

  data.lyrics = data.lyrics.replaceAll("\x92", "'");

  console.log(data);
  return data;
};

export interface LyricsData {
  lyrics: string;
}

//Taylor Swift/Bad BloodTaylor Swift/Bad Blood
