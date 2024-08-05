import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Stained Glass Map",
    description: "Stained Glass Map, a way to find the best stained glass in Ireland.",
    keywords: "stained glass, ireland, map, art",
    twitter: {
      site: "@TimFarrelly8",
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
          <head>
              <meta name="theme-color" content="#fff"/>
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
              <link rel="manifest" href="/favicon/site.webmanifest"/>
              <link rel="shortcut icon" href="/favicon/favicon.ico"/>
              <meta name="application-name" content="Stained Glass Map"/>
              <meta name="apple-mobile-web-app-capable" content="yes"/>
              <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
              <meta name="apple-mobile-web-app-title" content="Stained Glass Map"/>
              <meta name="format-detection" content="telephone=no"/>
              <meta name="mobile-web-app-capable" content="yes"/>
              <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"/>
              <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
              {/*<link rel="manifest" href="/manifest.json" />*/}
              <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
          </head>
          <body className={inter.className}>{children}</body>
        </html>
    );
}
