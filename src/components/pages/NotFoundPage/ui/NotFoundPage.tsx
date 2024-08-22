"use client";

import Link from "next/link";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">404</h1>
          <p className="dark:text-white·md:text-4xl mb-4 text-3xl font-bold tracking-tight text-gray-900">
            Somethings missing.
          </p>
          <p className="dark:text-white·md:text-4xl mb-4 text-lg font-light text-gray-500">
            Sorry, we cant find that page. Youll find lots to explore on the home page.
          </p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
