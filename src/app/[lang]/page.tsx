import { WelcomePage } from "@pages/WelcomePage";

export default async function Home({ params }: { params: { lang?: string } }) {
  return <WelcomePage params={params} />;
}
