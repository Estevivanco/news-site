"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function resolveHref(link) {
  const cachedUrl = link?.cached_url ?? "";
  return cachedUrl.startsWith("/") ? cachedUrl : `/${cachedUrl}`;
}

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
          <span className="text-lg font-semibold text-white">{siteTitle}</span>
        )}
      </Link>
      <nav className="justify-self-center">
        <ul className="flex gap-6 text-sm">
          {navItems?.map((item) => (
            <NavItem key={item._uid} item={item} />
          ))}
        </ul>
      </nav>
      <div aria-hidden="true" />
    </header>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={resolveHref(item.link)}
        className="relative font-bold uppercase text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
        aria-expanded={hasChildren ? open : undefined}
        aria-haspopup={hasChildren ? "true" : undefined}
      >
        {item.label}
      </Link>

      {hasChildren && (
        <ul
          className={`absolute left-0 top-full min-w-[10rem] rounded-md bg-white py-2 shadow-lg transition-opacity ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {item.children.map((child) => (
            <li key={child._uid}>
              <Link
                href={resolveHref(child.link)}
                className="block whitespace-nowrap px-4 py-2 text-sm font-normal normal-case text-zinc-800 hover:bg-zinc-100"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}