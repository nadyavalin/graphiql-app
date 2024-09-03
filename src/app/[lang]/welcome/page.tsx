import { Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../app/[lang]/dictionaries";

export const WelcomePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <main>
        <h1>Welcome Page</h1>
        <p>{dictionary.home.title}</p>
        <p>{dictionary.home.desc}</p>
      </main>
    </>
  );
};
