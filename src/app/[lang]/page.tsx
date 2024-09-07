// import { ErrorBoundary } from "@shared/errorBoundary";
import { WelcomePage } from "./welcome/page";

// TODO
export default async function Home() {
  return (
    <>
      {/* <ErrorBoundary> */}
      <WelcomePage />
      {/* </ErrorBoundary> */}
    </>
  );
}
