import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clayrety | Himalaya Klankschaalsessies",
  description:
    "Himalaya Klankschaalsessies in Amsterdam. Ervaar diepe ontspanning en innerlijke rust door de kracht van klankschalen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
