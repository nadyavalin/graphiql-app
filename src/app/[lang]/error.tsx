"use client";

import { useDictionary } from "@shared/providers/DictionaryProvider";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dictionary = useDictionary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{dictionary.error.smtWentWrong}!</h2>
      <button onClick={() => reset()}>{dictionary.error.try}</button>
    </div>
  );
}
