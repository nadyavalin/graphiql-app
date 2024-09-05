// import { auth } from "../../../../firebaseConfig";
import { Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../app/[lang]/dictionaries";
// import { useAuthState } from "react-firebase-hooks/auth";

export const WelcomePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  // const [user] = useAuthState(auth);

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
