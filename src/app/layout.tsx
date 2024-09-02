import "./globals.css";
import { ClientProviders } from "@shared/providers/ClientProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moon GraphQL",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
