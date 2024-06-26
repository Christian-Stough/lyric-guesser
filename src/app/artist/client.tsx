"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import type { Artist } from "~/lib/artists";

export default function ArtistSelectionClient({
  artists,
}: {
  artists: Artist[];
}) {
  const router = useRouter();
  return (
    <main className="flex h-screen flex-wrap  items-center justify-center overflow-y-auto p-4">
      <div className="flex h-fit flex-wrap items-center justify-center gap-8">
        {artists.map((artist) => (
          <Button
            key={artist.id}
            size="icon"
            className={`group relative size-48 bg-transparent text-xl text-white hover:bg-transparent `}
            onClick={() => router.push(`/play/${artist.name}`)}
          >
            <Image
              src={artist.image}
              fill
              alt={artist.name}
              className="absolute left-0 top-0 z-0 opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-80"
            />
            <span className=" z-10 flex h-fit w-full flex-wrap items-center justify-center text-wrap transition-all duration-300 ease-in-out group-hover:text-white/10 ">
              {artist.name}
            </span>
          </Button>
        ))}
      </div>
    </main>
  );
}
