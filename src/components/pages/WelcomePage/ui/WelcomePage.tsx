import { getDictionary } from "../../../../app/[lang]/dictionaries";

const WelcomePage = async ({ params }: { params: { lang?: string } }) => {
  if (!params || !params.lang) {
    return (
      <main>
        <h1>Error</h1>
        <p>Language not specified.</p>
      </main>
    );
  }

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

export default WelcomePage;
