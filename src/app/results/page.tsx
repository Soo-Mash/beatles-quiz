import Link from "next/link";

const ResultsPage = () => {
  return (
    <div className="mx-auto max-w-lg p-6 space-y-6">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-semibold">Your Results</h1>
        <p className="text-sm text-gray-600">Nice run!</p>
      </header>

      <div className="rounded border p-4 space-y-2">
        <p>
          <strong>Score:</strong> 3 / 5
        </p>
        <p>
          <strong>Accuracy:</strong> 60%
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/" className="rounded bg-black px-4 py-2 text-white">
          Exit
        </Link>
        <Link href="/quiz" className="rounded border px-4 py-2">
          Play Again
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
