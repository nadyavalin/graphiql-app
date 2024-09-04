import "./globals.css";
import { ClientProvider } from "@shared/providers/ClientProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moon GraphQL",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
