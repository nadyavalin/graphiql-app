import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { i18n, Locale } from "@config/i18n-config";
import DictionaryProvider from "@shared/providers/DictionaryProvider";
import { ClientProvider } from "@shared/providers/ClientProvider";
import { Footer, Header } from "@shared/ui";
import { getDictionary } from "./dictionaries";

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
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <DictionaryProvider dictionary={dictionary}>
        <ClientProvider>
          <Toaster position="bottom-center" />
          <Header params={{ lang: language }} />
          {children}
          <Footer />
        </ClientProvider>
      </DictionaryProvider>
    </NextIntlClientProvider>
  );
}
