import "./globals.css";

import { Inter } from "@next/font/google";
import { AnalyticsWrapper } from "./components/analytics";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`${inter.className} h-screen border-neutral-800 bg-neutral-900`}
      >
        <div className="flex-1">{children}</div>
        <AnalyticsWrapper />
        <footer className="flex justify-center gap-6 py-12">
          <Link
            href="https://twitter.com/rodgetech"
            target="_blank"
            className="text-neutral-600"
          >
            <FaTwitter fontSize={26} />
          </Link>
          <Link
            href="https://github.com/rodgetech/cron-ai"
            target="_blank"
            className="text-neutral-600"
          >
            <FaGithub fontSize={26} />
          </Link>
        </footer>
      </body>
    </html>
  );
}
