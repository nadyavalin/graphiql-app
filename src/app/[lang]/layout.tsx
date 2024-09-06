import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import { i18n, Locale } from "@config/i18n-config";
import { ClientProvider } from "@shared/providers/ClientProvider";
import DictionaryProvider from "@shared/providers/DictionaryProvider";
import { Footer, Header } from "@src/components/shared/ui";
import { getDictionary } from "./dictionaries";

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
  const dictionary = await getDictionary(language);

  return (
    <html lang={language}>
      <body>
        <ClientProvider>
          <Toaster position="bottom-center" />
          <DictionaryProvider dictionary={dictionary}>
            <Header params={{ lang: language }} />
            {children}
            <Footer />
          </DictionaryProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
