import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/tanstack-query-providers";




export const metadata: Metadata = {
  title: "Soubless User Portal",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
         
            {children}
         
        </QueryProvider>
      </body>
    </html>
  );
}
