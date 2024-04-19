import "server-only";
import { db } from "./db";

export const getArtists = async () => {
  return await db.query.artists.findMany();
};
