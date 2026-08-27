import type { Metadata } from "next";
import { Copse, Ubuntu } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import SystemConsole from "@/components/SystemConsole";

const copse = Copse({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-copse",
});

const ubuntu = Ubuntu({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Andy Hay - Software Engineering Leader",
  description:
    "Professional portfolio of Andy Hay, a Software Engineering Manager specializing in streaming architectures, frontend systems, and high-scale web platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${copse.variable} ${ubuntu.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
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
