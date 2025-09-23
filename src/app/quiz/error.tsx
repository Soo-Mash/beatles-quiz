"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="mx-auto max-w-lg p-6 space-y-2">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="text-sm text-red-600">{error.message}</p>
    </main>
  );
}
