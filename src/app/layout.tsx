import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Kerno Studio | Tu idea, hecha realidad con IA",
    template: "%s | Kerno Studio",
  },
  description:
    "Describe tu proyecto y recibe un prototipo funcional gratis en 48h. Desarrollo premium con inteligencia artificial. Landing pages, MVPs, SaaS y sistemas completos.",
  keywords: [
    "desarrollo web",
    "IA",
    "prototipo",
    "SaaS",
    "aplicaciones",
    "MVP",
    "landing page",
    "inteligencia artificial",
    "desarrollo a medida",
    "Kerno Studio",
  ],
  authors: [{ name: "Kerno Studio" }],
  creator: "Kerno Studio",
  publisher: "Kerno Studio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kerno Studio | Tu idea, hecha realidad con IA",
    description:
      "Describe tu proyecto y recibe un prototipo funcional gratis en 48h. Desarrollo premium con IA.",
    type: "website",
    url: "https://kerno.studio",
    siteName: "Kerno Studio",
    locale: "es_ES",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kerno Studio — Desarrollo con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kerno Studio | Tu idea, hecha realidad con IA",
    description: "Prototipo funcional gratis en 48h. Desarrollo premium con IA.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://kerno.studio"),
  alternates: {
    canonical: "/",
    languages: {
      "es": "/",
      "en": "/?lang=en",
      "fr": "/?lang=fr",
      "de": "/?lang=de",
      "it": "/?lang=it",
      "pt": "/?lang=pt",
      "ca": "/?lang=ca",
      "gl": "/?lang=gl",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
