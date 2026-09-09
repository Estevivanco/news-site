import Image from "next/image";

export default function Hero({ logo, slogan }) {
  const logoUrl = logo?.filename;

  return (
    <div className="flex flex-col items-center gap-4 border-b border-black/10 bg-accent/10 px-6 py-16 text-center dark:border-white/15">
      {slogan && (
        <p className="max-w-2xl text-2xl text-zinc-600 dark:text-zinc-400 sm:text-3xl">
          {slogan}
        </p>
      )}
    </div>
  );
}
