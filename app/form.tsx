import { ChangeEvent, useState } from "react";

type Props = {
  generateCron: (prompt: string) => void;
  result?: string;
  loading: boolean;
};

export default function Form({ generateCron, result, loading }: Props) {
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    generateCron(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleCopy = () => {
    setCopied(true);
    if (result) navigator.clipboard.writeText(result);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <div className="space-y-6">
        <input
          name="prompt"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="every hour, every day, every 3 months, etc"
          className="w-full rounded-md bg-neutral-800 px-2 py-5 outline-none"
          autoFocus
        />
        {result && (
          <div className="flex items-center rounded-md bg-neutral-800 px-2 py-5">
            <div className="flex-1">
              <p className="text-xl">{result}</p>
            </div>
            <div>
              {!copied && (
                <div className="cursor-pointer text-sm" onClick={handleCopy}>
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
          onClick={handleSubmit}
          disabled={!inputValue || loading}
          type="submit"
          className="mt-4 w-full rounded-md bg-neutral-700 px-8 py-2.5 text-base  text-white hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Done
        </button>
      </div>
    </>
  );
}
