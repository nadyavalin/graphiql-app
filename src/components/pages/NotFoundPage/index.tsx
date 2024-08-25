"use client";

import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <section>
      <div>
        <h1>404</h1>
        <p>Somethings missing.</p>
        <p>Sorry, we cant find that page. You will find lots to explore on the Home Page.</p>
        <Link href="/">Back to Home Page</Link>
      </div>
    </section>
  );
};
