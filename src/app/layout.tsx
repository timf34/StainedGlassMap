import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stained Glass Map",
  description: "Stained Glass Map, a way to find the best stained glass in Ireland.",
  keywords: "stained glass, ireland, map, art",
  twitter: {
    site: "@TimFarrelly8",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#fff" />
        <meta name="application-name" content="Stained Glass Map" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stained Glass Map" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="description" content="Stained Glass Map, helping you find beautiful stained glass by mapping the
        Irish stained glass ecosystem." />
        <meta name="keywords" content="stained glass, ireland, map, art" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Stained Glass Map" />
        <meta property="og:description" content="Stained Glass Map, a way to find the best stained glass in Ireland." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stainedglassmap.com" />
        <meta property="og:image" content="https://stainedglassmap.com/favicon/android-chrome-192x192.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:site" content="@TimFarrelly8" />
        <meta name="twitter:title" content="Stained Glass Map" />
        <meta name="twitter:description" content="Stained Glass Map, find the best stained glass in Ireland." />
        <meta name="twitter:image" content="https://stainedglassmap.com/favicon/android-chrome-192x192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

        {/* Additional meta tags for PWA (Progressive Web App) */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>{children}</body>
      </html>
  );
}
