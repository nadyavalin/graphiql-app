"use client";

import { useDictionary } from "@shared/providers/DictionaryProvider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dictionary = useDictionary();

  return (
    <main>
      <section className="error-box">
        <h2>{dictionary.error.smtWentWrong}!</h2>
        <div className="error">{error.message}</div>
        <button onClick={() => reset()} className="error-button">
          {dictionary.error.try}
        </button>
      </section>
    </main>
  );
}
