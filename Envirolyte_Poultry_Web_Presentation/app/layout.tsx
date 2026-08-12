import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex" });

export const metadata: Metadata = {
  title: "Envirolyte for Poultry | Interactive Presentation",
  description: "An interactive presentation of Envirolyte water treatment and farm-wide poultry biosecurity.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Envirolyte for Poultry", description: "Cleaner Water. Safer Operations. Better Performance.", type: "website", images: [{ url: "/og.png", width: 1680, height: 945, alt: "Envirolyte for Poultry" }] },
  twitter: { card: "summary_large_image", title: "Envirolyte for Poultry", description: "Cleaner Water. Safer Operations. Better Performance.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={plex.variable}>{children}</body></html>;
}
