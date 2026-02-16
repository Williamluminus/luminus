import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminus - Dashboard E-commerce",
  description: "Dashboard completo para gestão de e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
