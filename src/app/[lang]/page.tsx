import { Locale } from "../../../i18n-config";
import { WelcomePage } from "./welcome/page";

export default async function Home({ params }: { params: { lang?: string } }) {
  const language: Locale = params.lang === "en" || params.lang === "ru" ? params.lang : "en";
  return <WelcomePage params={{ lang: language }} />;
}
