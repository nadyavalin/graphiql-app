import "./globals.css";
import { Footer, Header } from "@shared/ui";
import { ClientProviders } from "@shared/providers/ClientProviders";

interface LangParams {
  lang: string;
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: LangParams;
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang}>
      <body>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
