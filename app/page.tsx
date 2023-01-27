import Image from "next/image";

export default function Home() {
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
        <form action="">
          <input
            type="text"
            placeholder="every 3 months, every hour, etc"
            className="w-full bg-neutral-800 px-2 py-5 rounded-sm outline-none"
            autoFocus
          />
        </form>
        <div className="mt-8 bg-neutral-800  rounded-sm px-2 py-5 flex items-center">
          <div className="flex-1">
            <p className="text-xl">0 0 * * *</p>
          </div>
          <div className="cursor-pointer">Copy</div>
        </div>
      </div>
    </main>
  );
}
