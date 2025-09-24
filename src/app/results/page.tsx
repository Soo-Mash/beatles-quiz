"use client";

import Link from "next/link";
import { getItem, clearAll } from "@/lib/storageHelpers";
import { useRouter } from "next/navigation";

const ResultsPage = () => {
  const router = useRouter();

  const roundsPlayed = getItem("roundsPlayed") ?? 0;
  const guessesMade = getItem("guessesMade") ?? 0;
  const correctGuesses = getItem("correctGuesses") ?? 0;
  const playerName = getItem("playerName") ?? "Player";

  return (
    <div className="mx-auto max-w-lg p-6 space-y-6">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-semibold">Your Stats</h1>
        <p className="text-sm text-gray-600">Nice run, {playerName}!</p>
      </header>

      <div className="rounded border p-4 space-y-2">
        <p>
          <strong>Rounds played:</strong> {roundsPlayed}
        </p>
        <p>
          <strong>Total guesses:</strong> {guessesMade}
        </p>
        <p>
          <strong>Total correct guesses:</strong> {correctGuesses}
        </p>
        <p>
          <strong>Accuracy:</strong>{" "}
          {((correctGuesses / guessesMade) * 100).toFixed(1)}%
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => {
            clearAll();
            router.push("/");
          }}
          className="rounded bg-black px-4 py-2 text-white cursor-pointer hover:bg-gray-800 "
        >
          Exit
        </button>
        <Link
          href="/quiz"
          className="rounded bg-white px-4 py-2 font-medium text-black cursor-pointer hover:bg-gray-300 "
        >
          Play Again
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
