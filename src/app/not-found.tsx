import Image from "next/image";
import { Link } from "@mui/material";
import "./globals.css";
import page404 from "@public/cat.png";

function NotFound() {
  return (
    <main>
      <section>
        <p className="text404">404</p>
        <Image src={page404} alt="404" width="390" height="460" />
        <p>Somethings missing.</p>
        <p>Sorry, we cant find that page. You will find lots to explore on the Home Page.</p>
        <Link href="/">Back to Home Page</Link>
      </section>
    </main>
  );
}

export default NotFound;
