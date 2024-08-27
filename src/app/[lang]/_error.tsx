import { NextPageContext } from "next";
import NotFound from "./not-found";

type Props = {
  statusCode: number;
  message?: string;
};

const ErrorPage = ({ statusCode, message }: Props) => {
  if (statusCode === 404) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>
        Error {statusCode}: {message || "Something went wrong"}
      </h1>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  const message = err?.message || undefined;

  return { statusCode, message };
};

export default ErrorPage;
