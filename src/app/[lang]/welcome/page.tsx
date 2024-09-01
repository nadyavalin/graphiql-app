import { getDictionary } from "../../../app/[lang]/dictionaries";

export const WelcomePage = async ({ params }: { params: { lang?: string } }) => {
  const lg = await getDictionary(params.lang);

  return (
    <>
      <main>
        <h1>Welcome Page</h1>
        <p>{lg.home.title}</p>
        <p>{lg.home.desc}</p>
      </main>
    </>
  );
};
