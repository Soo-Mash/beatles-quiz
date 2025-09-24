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

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

//  <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           src={`/api/beatles/${id}`}
//           alt={`Album cover ${id}`}
//           width={300}
//           height={300}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-bold px-1 py-0.5 rounded">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
