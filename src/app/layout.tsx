import "./globals.css";
import { ClientProvider } from "@shared/providers/ClientProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
