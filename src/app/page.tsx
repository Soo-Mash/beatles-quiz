"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setItem } from "@/lib/storageHelpers";

interface PlayerINfoForm {
  name: string;
  email: string;
}

const Home = () => {
  const router = useRouter();
  const [form, setForm] = useState<PlayerINfoForm>({ name: "", email: "" });
  const [touched, setTouched] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });

  // basic no of characters & email format regex validation
  const nameValid = form.name.trim().length >= 2;
  const emailValid = /^\S+@\S+\.\S+$/.test(form.email);
  const isValid = nameValid && emailValid;

  const onChange =
    (key: keyof PlayerINfoForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  // mark field as touched after blur ie after clicking away
  const onBlur = (key: keyof PlayerINfoForm) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission things ie page reload
    if (!isValid) {
      setTouched({ name: true, email: true });
      return;
    }

    // save basic player details to session storage for use in quiz and resultspages
    const playerInfo = {
      name: form.name.trim(),
      email: form.email.trim(),
    };

    setItem("playerName", playerInfo.name);
    setItem("playerEmail", playerInfo.email);
    console.log("playerInfo: ,", playerInfo);
    router.push("/quiz");
  };

  return (
    <div className="mx-auto max-w-md p-6 space-y-6">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Beatles Quiz & Trivia</h1>
        <p className="text-sm text-gray-600">
          Guess the album name from the cover art
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange("name")}
            onBlur={() => onBlur("name")}
            placeholder="e.g. Simon"
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {touched.name && !nameValid && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              Please enter at least 2 characters.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            onBlur={() => onBlur("email")}
            placeholder="email@example.com"
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {touched.email && !emailValid && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              Please enter a valid email.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="block w-full text-center rounded bg-white px-4 py-2 font-medium text-black cursor-pointer hover:bg-gray-100 "
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default Home;
