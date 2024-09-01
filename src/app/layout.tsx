import "./globals.css";
import { Footer, Header } from "@shared/ui";
import { ClientProviders } from "@shared/providers/ClientProviders";
import type { Metadata } from "next";
import { i18n, Locale } from "../../i18n-config";

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
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <ClientProviders>
          <Header params={params} />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
