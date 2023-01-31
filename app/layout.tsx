import "./globals.css";

import { Inter } from "@next/font/google";
import { AnalyticsWrapper } from "./components/analytics";
import { FaGithub } from "react-icons/fa";
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
      <body className={`${inter.className}  border-neutral-800 bg-neutral-900`}>
        {children}
        <AnalyticsWrapper />
      </body>
      <footer className="mt-12 flex justify-center">
        <Link
          href="https://github.com/rodgetech/cron-ai"
          target="_blank"
          className="flex items-center space-x-2 text-neutral-600"
        >
          <FaGithub fontSize={24} />
          <span>View code</span>
        </Link>
      </footer>
    </html>
  );
}
