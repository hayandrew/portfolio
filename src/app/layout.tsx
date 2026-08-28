import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import SystemConsole from "@/components/SystemConsole";

const ubuntu = Ubuntu({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Andy Hay - Software Engineering Leader",
  description:
    "Professional portfolio of Andy Hay, a Software Engineering Manager specializing in streaming architectures, frontend systems, and high-scale web platforms.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/images/icons/favicon.ico",
    apple: [
      { url: "/images/icons/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/images/icons/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="layoutBody">
        <Navigation />
        <SystemConsole />
        <main className="mainContent">{children}</main>
        <footer className="layoutFooter">
          <div className="content-wrapper footerContent">
            <span>
              &copy; {new Date().getFullYear()} Andy Hay. All rights reserved.
            </span>
            <div className="footerLinks">
              <a
                href="https://www.linkedin.com/in/andyhaynyc/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/hayandrew?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.youtube.com/@ANDYvsMACHINE"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
