"use client";

import Link from "next/link";

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Question 1 of 5</h1>
        <span className="text-sm text-gray-600">Score: 0</span>
      </div>

      {/* blank spot for where image will go */}
      <div className="rounded border p-4 flex items-center justify-center h-72">
        <div className="text-gray-500"> album art will go here</div>
      </div>

      <div className="space-y-2">
        <button className="w-full rounded border px-3 py-2 text-left hover:bg-gray-50">
          Option 1: Album Name
        </button>
        <button className="w-full rounded border px-3 py-2 text-left hover:bg-gray-50">
          Option 2: album Name
        </button>
        <button className="w-full rounded border px-3 py-2 text-left hover:bg-gray-50">
          Option 3: Album Name
        </button>
      </div>

      <div className="flex items-center justify-end">
        {/* for now, allow jumping to results without checkibg answer was given */}
        <Link href="/results" className="rounded bg-black px-4 py-2 text-white">
          Exit Quiz
        </Link>
        <button className="rounded px-4 py-2 border">Next</button>
      </div>
    </div>
  );
}
