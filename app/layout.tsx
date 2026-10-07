import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { siteName, siteUrl } from "./site";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kumbh-sans",
  display: "swap",
});

const description = "Victor Crest's profile card, built for the Frontend Mentor profile card component challenge.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Profile card | Royer Adames",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName, title: "Profile card | Royer Adames", description },
};

const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={kumbhSans.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
