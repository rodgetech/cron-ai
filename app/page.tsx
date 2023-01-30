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

    console.log(data);

    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="m-auto max-w-xl p-4 text-white">
      <div className="mt-8 border-b border-neutral-800 pb-3 text-center">
        <h1 className="text-3xl">Cron AI</h1>
        <p className="tracking-wider text-neutral-400">
          Words to cron expression
        </p>
      </div>
      <div className="mt-12">
        <h2 className="pb-3 text-xl">I want a Cron job that runs</h2>
        <Form generateCron={generateCron} result={result} />
      </div>
    </main>
  );
}
