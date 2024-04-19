"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getLyrics } from "~/server/api_calls";

import React, { useState } from "react";

export default function FreePlayPage() {
  const router = useRouter();

  const [artist, setArtist] = useState<string>("");
  const [song, setSong] = useState<string>("");

  return (
    <main className="h-screen overflow-y-auto p-4">
      <form
        className="flex h-full  flex-col items-center justify-center gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const lyrics = await getLyrics(artist, song);

          if (lyrics.hasOwnProperty("error")) {
            toast.error("SONG DONT EXISTS NERD");
            return;
          }

          router.push(`/play/${artist}/${song}`);
        }}
      >
        <div className="flex w-[300px] flex-col gap-2">
          <Label>Artist</Label>
          <Input onChange={(e) => setArtist(e.target.value)} />
        </div>
        <div className="flex w-[300px] flex-col gap-2">
          <Label>Song</Label>
          <Input onChange={(e) => setSong(e.target.value)} />
        </div>

        <Button className="w-[300px]">Search</Button>
      </form>
    </main>
  );
}
