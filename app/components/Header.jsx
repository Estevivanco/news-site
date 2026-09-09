import Image from "next/image";
import Link from "next/link";

export default function Header({ siteTitle, logo, navItems }) {
  const logoUrl = logo?.filename;

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-accent px-6 py-4">
      <Link href="/" className="justify-self-start">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={logo.alt || siteTitle || "Logo"}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <span className="text-lg font-semibold text-white">
            {siteTitle}
          </span>
        )}
      </Link>
      <nav className="justify-self-center">
        <ul className="flex gap-6 text-sm">
          {navItems?.map((item) => (
            <li key={item._uid}>
              <Link
                href={item.link?.cached_url}
                className="relative font-bold uppercase text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div aria-hidden="true" />
    </header>
  );
}
