import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import favicon from "public/favicon.ico";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "convertmyfec - Modifier les racines des comptes auxiliaires du FEC facilement",
  description: "convertmyfec est un outil simple et rapide pour modifier les racines des comptes auxiliaires dans un FEC",
  generator: "Next.js",
  applicationName: "convertmyfec",
  keywords: [
    "FEC",
    "convertisseur",
    "convertir FEC",
    "modifier",
    "modifier FEC",
    "comptes auxiliaires FEC",
    "comptes auxiliaires",
    "racines comptables",
    "racines auxiliaires FEC",
    "racines comptables auxiliaires",
  ],
  authors: [
    { name: "Thomas Ramillon", url: "https://portfolio-tomram.vercel.app" },
  ],
  creator: "Thomas Ramillon",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  linkedin: {
    title: "Thomas Ramillon",
    description: "Développeur Web Front-end",
    url: "https://www.linkedin.com/in/thomas-ramillon-0b584611b",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href={favicon} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="author" content={metadata.authors[0].name} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertmyfec.com" />
        <meta property="og:image" content="https://convertmyfec.com/og-image.jpg" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
