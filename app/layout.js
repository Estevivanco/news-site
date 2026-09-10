import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getConfig } from "./lib/storyblok";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "News Superiore",
  description: "Superior news at all times",
};

export default async function RootLayout({ children }) {
  const config = await getConfig();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header
          siteTitle={config.site_title}
          logo={config.logo}
          navItems={config.header}
        />
        <main className="flex-1">{children}</main>
        <Footer text={config.footer_text} />
      </body>
    </html>
  );
}
