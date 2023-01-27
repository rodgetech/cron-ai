import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

type Props = {
  generateCron: (prompt: string) => void;
};

export default function Form({ generateCron }: Props) {
  const [prompt, setPrompt] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value;
    console.log(prompt);
    setPrompt(prompt);
    generateCron(prompt);
  };

  const debouncedChangeHandler = useCallback(debounce(onChange, 400), []);

  return (
    <input
      onChange={debouncedChangeHandler}
      type="text"
      placeholder="every 3 months, every hour, etc"
      className="w-full bg-neutral-800 px-2 py-5 rounded-sm outline-none"
      autoFocus
    />
  );
}
