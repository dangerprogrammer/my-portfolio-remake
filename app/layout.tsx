import type { Metadata } from "next";
import "@/styles/global.scss";
import { GlobalProvider } from "@/components/context/context";
import { RefProvider } from "@/components/context/ref-context";

const metadata: Metadata = {
  title: {
    template: '%s | Patrick',
    default: 'Patrick Portfolio'
  },
  description: 'A website for my portfolio'
};

export { metadata };

function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return <html lang="pt-BR">
    <body>
      <GlobalProvider>
        <RefProvider>
          {children}
        </RefProvider>
      </GlobalProvider>
    </body>
  </html>
}

export default RootLayout;