import Link from "next/link";
import "../globals.css";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
