"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="mx-auto max-w-lg p-6 space-y-2">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="text-sm text-red-600">{error.message}</p>
    </div>
  );
};

export default Error;
