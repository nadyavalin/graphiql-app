"use client";

import { useTranslations } from "next-intl";
import { MouseEventHandler } from "react";

interface ErrorProps {
  reset: MouseEventHandler<HTMLButtonElement>;
}

export default function Error({ reset }: ErrorProps) {
  const t = useTranslations("Error");

  return (
    <div>
      <h1>{t("title")}</h1>
      <button onClick={reset}>{t("retry")}</button>
    </div>
  );
}
