"use client";
import { useRouter } from "next/navigation";

export const GoBack = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 inline-flex mb-8 rounded-lg bg-amber-400 hover:bg-amber-500 transition-colors text-white capitalize font-semibold"
    >
      Volver
    </button>
  );
};
