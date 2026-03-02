import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Karla, Rubik } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Clayrety | Himalaya Klankschaalsessies",
  description:
    "Himalaya Klankschaalsessies in Amsterdam. Ervaar diepe ontspanning en innerlijke rust door de kracht van klankschalen.",
  keywords:
    "klankschalen, sound bowls, himalaya, amsterdam, meditatie, ontspanning, healing, cacao ceremonie",
  openGraph: {
    title: "Clayrety | Himalaya Klankschaalsessies",
    description:
      "Ervaar diepe ontspanning en innerlijke rust door de kracht van Himalaya klankschalen in Amsterdam.",
    type: "website",
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
        className={`${karla.variable} ${rubik.variable} font-body antialiased bg-white text-deep-blue`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
