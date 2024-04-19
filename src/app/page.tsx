"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getLyrics } from "~/server/api_calls";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8 overflow-y-auto p-4">
      <Button className="w-[300px]" onClick={() => router.push("/artist")}>
        Artist Mode
      </Button>
      <Button className="w-[300px]" onClick={() => router.push("/freeplay")}>
        Free Play
      </Button>
    </main>
  );
}
