import {
  index,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `lyric_guesser_${name}`);

export const artists = createTable(
  "artists",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    image: varchar("image", { length: 256 }).notNull(),
    songs: text("songs").notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
