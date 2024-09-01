import { Link } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <main>
        <section>
          <h1>404</h1>
          <p>Somethings missing.</p>
          <p>Sorry, we cant find that page. You will find lots to explore on the Home Page.</p>
          <Link href="/">Back to Home Page</Link>
        </section>
      </main>
    </>
  );
}
