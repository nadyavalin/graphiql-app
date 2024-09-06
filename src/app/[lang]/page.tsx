import { Languages } from "@shared/types";
import { Locale } from "@config/i18n-config";
import { WelcomePage } from "./welcome/page";

export default async function Home({ params }: { params: { lang?: string } }) {
  const language: Locale =
    params.lang === Languages.EN || params.lang === Languages.RU
      ? (params.lang as Locale)
      : Languages.EN;

  return <WelcomePage params={{ lang: language }} />;
}
