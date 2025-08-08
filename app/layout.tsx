import type { Metadata } from "next";
import "@/styles/global.scss";
import ContextProvider from "@/components/context/context";

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
      <ContextProvider>
        {children}
      </ContextProvider>
    </body>
  </html>
}

export default RootLayout;