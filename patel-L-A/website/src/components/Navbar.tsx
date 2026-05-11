"use client";

import Link from "next/link";
import { useState } from "react";
import Image from 'next/image'

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks: NavLink[] = [
  { label: "Investment Planning", href: "/services/investment-planning" },
  { label: "Portfolio Strategy", href: "/services/portfolio-strategy" },
  { label: "Wealth Advisory", href: "/services/wealth-advisory" },
];

function ChevronDown() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#050b0d] px-4 py-3 sm:px-6 lg:px-9">
      <nav
        aria-label="Primary navigation"
        className="mx-auto max-w-7xl rounded-[34px] bg-[#dddddd] px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03] sm:px-8"
      >
        <div className="flex min-h-12 items-center justify-between gap-5">
          <div className="block">
            <Link href="/" aria-label="Patel Legal Advisors" title="Patel Legal Advisors" className="flex min-w-0 items-center gap-3 text-white outline-none transition-opacity hover:opacity-90 focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
            <Image src="images/patel-legal-advisors-logo.svg" width={80} height={80} alt="Patel Legal Advisors Logo"/>
          </Link>
          </div>
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              href="/"
              aria-current="page"
              className="rounded-full px-6 py-3 text-black font-bold transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              Home
            </Link>

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full px-2 py-3 text-base font-semibold text-black-300 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]"
              >
                Services
                <ChevronDown />
              </button>
              <div className="invisible absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 rounded-2xl bg-white p-2 opacity-0 shadow-2xl shadow-black/30 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full px-2 py-3 text-base font-semibold text-black-300 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]"
              >
                Services
                <ChevronDown />
              </button>
              <div className="invisible absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 rounded-2xl bg-white p-2 opacity-0 shadow-2xl shadow-black/30 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href} 
                href={link.href}
                className="rounded-full px-2 py-3 text-base font-semibold text-black transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22] lg:hidden"
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`${isMenuOpen ? "grid" : "hidden"} gap-2 pt-5 lg:hidden`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {link.label}
            </Link>
          ))}

          <div className="rounded-2xl bg-white/[0.04] p-2">
            <p className="px-2 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
              Services
            </p>
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
