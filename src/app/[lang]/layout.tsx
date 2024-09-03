import "../globals.css";
import { Footer } from "@shared/ui";
import { HeaderServer } from "@shared/ui/Header/index.server";
import { ClientProviders } from "@shared/providers/ClientProviders";
import type { Metadata } from "next";
import { i18n, Locale } from "../../../i18n-config";

export const metadata: Metadata = {
  title: "Moon GraphQL",
  description: "",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
  isSticky,
}: {
  children: React.ReactNode;
  params: { lang?: Locale };
  isSticky: boolean;
}) {
  const language = params.lang || "en";
  return (
    <html lang={params.lang}>
      <body>
        <ClientProviders>
          <HeaderServer params={{ lang: language }} sticky={isSticky} />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
