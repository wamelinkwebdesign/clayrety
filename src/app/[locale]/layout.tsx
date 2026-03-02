import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Karla, Playfair_Display } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Clayrety | Himalaya Klankschaalsessies Amsterdam",
  description:
    "Ervaar diepe ontspanning door Himalaya klankschaalsessies in Amsterdam. Privé & groepssessies, cacao ceremonies en holistische massage. Boek nu vanaf €35.",
  openGraph: {
    title: "Clayrety | Himalaya Klankschaalsessies Amsterdam",
    description:
      "Ervaar diepe ontspanning en innerlijke rust door de kracht van Himalaya klankschalen in Amsterdam.",
    type: "website",
    siteName: "Clayrety",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${karla.variable} ${playfair.variable} font-body antialiased bg-white text-deep-blue`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
