import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const circular = localFont({
  src: [
    {
      path: "../../public/fonts/сircular-font-family/CircularStd-Black.otf",
      weight: "900",
    },
    {
      path: "../../public/fonts/сircular-font-family/CircularStd-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/сircular-font-family/CircularStd-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/сircular-font-family/CircularStd-Light.otf",
      weight: "300",
    },
  ],
  display: "swap",
  variable: "--font-circular",
});

import { Figtree } from "next/font/google";
const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Listening",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${circular.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
