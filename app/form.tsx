import { FormEvent } from "react";

type Props = {
  generateCron: (prompt: string) => void;
  result?: string;
  loading: boolean;
};

export default function Form({ generateCron, result, loading }: Props) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      prompt: { value: string };
    };
    const prompt = target.prompt.value;
    generateCron(prompt);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6">
        <input
          name="prompt"
          type="text"
          placeholder="every 3 months, every hour, etc"
          className="w-full rounded-md bg-neutral-800 px-2 py-5 outline-none"
          autoFocus
        />
        {result && (
          <div className="flex items-center rounded-md bg-neutral-800 px-2 py-5">
            <div className="flex-1">
              <p className="text-xl">{result}</p>
            </div>
            <div className="cursor-pointer text-sm">Copy</div>
          </div>
        )}
        <button
          disabled={loading}
          type="submit"
          className="mt-4 w-full rounded-md bg-neutral-700 px-8 py-2.5 text-base  text-white hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Done
        </button>
      </div>
    </form>
  );
}
