import Link from "next/link";

export default function Header({ siteTitle, navItems }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-4 dark:border-white/15">
      <Link href="/" className="text-lg font-semibold">
        {siteTitle}
      </Link>
      <nav>
        <ul className="flex gap-6 text-sm">
          {navItems?.map((item) => (
            <li key={item._uid}>
              <Link
                href={item.link?.cached_url}
                className="hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}