import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/tanstack-query-providers";

export const metadata: Metadata = {
  title: "Soubless User Portal",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <QueryProvider>
         
            {children}
         
        </QueryProvider>
      </body>
    </html>
  );
}
