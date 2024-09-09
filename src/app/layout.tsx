import { Metadata } from "next";
import "./globals.css";
import { i18n, Locale } from "@config/i18n-config";

export const metadata: Metadata = {
  title: "Moon GraphQL",
  description: "",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const language = params.lang || "en";

  return (
    <html lang={language}>
      <body>{children}</body>
    </html>
  );
}
