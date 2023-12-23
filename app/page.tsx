"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";

export default function Home() {
  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion();
    
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    if (completion) navigator.clipboard.writeText(completion);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
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
        <h2 className="pb-3 text-xl">I want a Cron job that runs:</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              type="text"
              placeholder="every hour, every day, every 3 months, etc"
              className="w-full rounded-md bg-neutral-800 px-2 py-5 outline-none"
              autoFocus
            />
            {completion && (
              <div className="flex items-center rounded-md bg-neutral-800 px-2 py-5">
                <div className="flex-1">
                  <p className="text-xl">{completion}</p>
                </div>
                <div>
                  {!copied && (
                    <div
                      className="cursor-pointer text-sm"
                      onClick={handleCopy}
                    >
                      Copy
                    </div>
                  )}
                  {copied ? (
                    <div>
                      <p className="ml-2 text-sm text-green-600">Copied</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            <button
              disabled={!input || isLoading}
              type="submit"
              className="mt-4 w-full rounded-md bg-neutral-700 px-8 py-2.5 text-base  text-white hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
