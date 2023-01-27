import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

type Props = {
  generateCron: (prompt: string) => void;
};

export default function Form({ generateCron }: Props) {
  const [prompt, setPrompt] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value;
    setPrompt(prompt);
    generateCron(prompt);
  };

  const debouncedChangeHandler = useMemo(() => debounce(onChange, 300), []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <input
      onChange={debouncedChangeHandler}
      type="text"
      placeholder="every 3 months, every hour, etc"
      className="w-full rounded-md bg-neutral-800 px-2 py-5 outline-none"
      autoFocus
    />
  );
}
