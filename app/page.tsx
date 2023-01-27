"use client";

import { useState } from "react";
import Form from "./form";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCron = async (prompt: string) => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="max-w-3xl m-auto p-4 text-white">
      <div className="mt-8 pb-2 text-center border-b border-neutral-800">
        <h1 className="text-3xl">Cron AI</h1>
        <p className="tracking-wider text-neutral-400">
          Words to cron expression
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl pb-2">I want a Cron job that runs</h2>
        <Form generateCron={generateCron} />
        <div className="mt-8 bg-neutral-800 rounded-sm px-2 py-5 flex items-center">
          <div className="flex-1">
            <p className="text-xl">0 0 * * *</p>
          </div>
          <div className="cursor-pointer">Copy</div>
        </div>
      </div>
    </main>
  );
}
