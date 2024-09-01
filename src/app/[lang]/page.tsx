import { WelcomePage } from "./welcome/page";

export default async function Home({ params }: { params: { lang?: string } }) {
  return <WelcomePage params={params} />;
}
