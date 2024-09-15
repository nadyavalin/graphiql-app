"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main>
          <section className="error-box">
            <h2>Something went wrong!</h2>
            <div className="error">{error.message}</div>
            <button onClick={() => reset()} className="error-button">
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
