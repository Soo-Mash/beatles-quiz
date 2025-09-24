"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { albumNamesHardcoded, albumTrivia } from "@/lib/albumInfo";
import { setItem, getItem } from "@/lib/storageHelpers";

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// build 5 sets of questions (with no repeats) and options
const buildQuestionsAndOptions = () => {
  const chosenAlbums: number[] = [];

  //   dont add new one to array if already present
  while (chosenAlbums.length < 5) {
    const newItem = randomNumber(1, 13);
    if (!chosenAlbums.includes(newItem)) {
      chosenAlbums.push(newItem);
    }
  }

  // assume the self-made list of alumbs and ids imported from the file lib/albumInfo defines what the correct mapping of album id to name is. Did this because that list is chrononolocal by release year
  return chosenAlbums.map((correctOptionId) => {
    const correctAlbum = albumNamesHardcoded.find(
      (a) => a.id === correctOptionId
    )!;

    // create two random distractor options that are not the correct answer and not the same as each other, not very efficient bc of the while loops but can improve later
    let distractor1 =
      albumNamesHardcoded[randomNumber(0, albumNamesHardcoded.length - 1)];
    while (distractor1.id === correctOptionId) {
      distractor1 =
        albumNamesHardcoded[randomNumber(0, albumNamesHardcoded.length - 1)];
    }

    let distractor2 =
      albumNamesHardcoded[randomNumber(0, albumNamesHardcoded.length - 1)];
    while (
      distractor2.id === correctOptionId ||
      distractor2.id === distractor1.id
    ) {
      distractor2 =
        albumNamesHardcoded[randomNumber(0, albumNamesHardcoded.length - 1)];
    }

    const options = [correctAlbum, distractor1, distractor2].sort(
      () => Math.random() - 0.5
    );

    return {
      coverAlbumId: correctOptionId,
      correctAlbumId: correctOptionId,
      options,
    };
  });
};

const QuizPage = () => {
  const router = useRouter();

  const questions = useMemo(() => buildQuestionsAndOptions(), []); //doing useMemo instead of useEffect because otherwise the questions are rebuilt every rerender of quiz component, creates weird jumpy behaviour when clicking on an option etc
  console.log(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false); // card flipping
  const [wrongId, setWrongId] = useState<number | null>(null); // id of incorrectly chosen option so it knows which one to do shake and flash effect

  const guessesMade = getItem("guessesMade") ?? 0;
  const roundsPlayed = getItem("roundsPlayed") ?? 0;
  const playerName = getItem("playerName") ?? "";

  const currentQuestion = questions[currentQuestionIndex];

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const onSelect = (albumId: number) => {
    const isCorrect = albumId === currentQuestion.correctAlbumId;

    // increment TOTAL guesses
    const guesses = (getItem("guessesMade") ?? 0) + 1;
    setItem("guessesMade", guesses);

    if (isCorrect) {
      // increment correct guesses
      const corrects = (getItem("correctGuesses") ?? 0) + 1;
      setItem("correctGuesses", corrects);

      setSelectedId(albumId);
      setWrongId(null);
      handleCardFlip();
    } else {
      setWrongId(albumId);
      setSelectedId(null);
      setTimeout(() => setWrongId(null), 350);
    }
  };

  const onNext = () => {
    if (isFlipped) setIsFlipped(false);
    if (currentQuestionIndex < 5 - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedId(null);
      }, 700);
    } else {
      // increment roundsPlayed
      const rounds = (getItem("roundsPlayed") ?? 0) + 1;
      setItem("roundsPlayed", rounds);

      setTimeout(() => {
        router.push("/results");
      }, 700);
    }
  };

  useEffect(() => {
    if (!playerName) router.push("/");
  }, [playerName, router]);

  return (
    <div className="mx-auto max-w-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Question {currentQuestionIndex + 1} of {5}
        </h1>
        <span className="text-sm text-gray-600">
          Round: {roundsPlayed + 1} | Guesses: {guessesMade}
        </span>
        <span className="text-sm text-gray-600"></span>
      </div>

      <div className="rounded p-4 flex items-center justify-center h-72">
        <div className="h-72 w-72 mx-auto perspective-1000">
          <div
            className={`relative h-full w-full transition-transform duration-700 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front of card showing album cover */}
            <div className="absolute w-full h-full backface-hidden">
              <Image
                src={`/api/beatles/${currentQuestion.coverAlbumId}`}
                alt="Beatles album cover"
                width={300}
                height={300}
                priority
                className="rounded"
              />
            </div>

            {/* back of the album art card, show trivia */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded border p-4 flex items-center justify-center text-center text-gray-700">
              <p className="text-sm">
                <p className="text-lg ">Correct!</p>
                <br />
                {
                  albumTrivia.find((t) => t.id === currentQuestion.coverAlbumId)
                    ?.fact
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">What album is this?</p>

        {currentQuestion.options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={`${option.id}-${currentQuestionIndex}`}
              onClick={() => onSelect(option.id)}
              className={
                "w-full rounded border px-3 py-2 text-left hover:bg-gray-50 hover:text-gray-700 " +
                (isSelected ? " border-green-500" : "") +
                (wrongId === option.id
                  ? "shake flash-red border-red-500 text-red-700 "
                  : "")
              }
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onNext}
          disabled={selectedId == null}
          className="rounded bg-white px-4 py-2 font-medium text-black cursor-pointer hover:bg-gray-300 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < 5 - 1 ? "Next" : "See stats"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
