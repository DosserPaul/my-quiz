import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import React from "react";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-[#37404A] max-h-screen h-full`}
      >
        {children}
      </body>
    </html>
  );
}
