"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="h-screen overflow-y-auto p-4">
      <form
        className="flex h-full flex-col items-center justify-center border"
        onSubmit={(e) => {
          e.preventDefault();

          router.push("/play/Taylor Swift");
        }}
      >
        <Button>Taylor Swift</Button>
      </form>
    </main>
  );
}
