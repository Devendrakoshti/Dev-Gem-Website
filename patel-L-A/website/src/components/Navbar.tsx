"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

const megaMenuGroups = [
  {
    title: "Types",
    links: [
      "Project",
      "Project Slider",
      "Project Slider 2",
      "Project Slider 3",
      "Project List",
      "Project Card",
    ],
  },
  {
    title: "Layout",
    links: [
      "Projects 2 Columns",
      "Projects 3 Columns",
      "Projects 4 Columns",
      "Projects 2 Columns Wide",
      "Projects 3 Columns Wide",
      "Projects 4 Columns Wide",
    ],
  },
  {
    title: "Hover Type",
    links: [
      "Project Hide Content",
      "Project Hide Content Wide",
      "Project Card Hover",
      "Project Slider Image Zoom",
      "Project Hide Show",
      "Project Slider Hover",
    ],
  },
  {
    title: "Single",
    links: [
      "Project Details",
      "Project Details Video",
      "Project Details Slider",
      "Project Image",
      "Project Gallery",
    ],
  },
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

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-[#a63f04]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h4.67a2.5 2.5 0 0 1 1.77.73L13.2 6H18.5A2.5 2.5 0 0 1 21 8.5v1H3v-3Z" />
      <path d="M2.3 11.1A2 2 0 0 1 4.23 9.6h16.04a1.5 1.5 0 0 1 1.44 1.92l-1.89 6.5A2.75 2.75 0 0 1 17.18 20H4.46a2.5 2.5 0 0 1-2.4-3.2l.24-.82 1.88-4.88Z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
    </svg>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function MegaMenuContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-4 lg:gap-10">
      {megaMenuGroups.map((group) => (
        <div key={group.title}>
          <div className="flex items-center gap-3 border-b border-[#a63f04] pb-4">
            <FolderIcon />
            <h3 className="text-base font-black text-[#050b0d]">{group.title}</h3>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {group.links.map((label) => (
              <Link
                key={`${group.title}-${label}`}
                href={`/projects/${slugify(label)}`}
                onClick={onNavigate}
                className="group/link flex items-center gap-2 py-4 text-sm font-bold text-[#050b0d] transition-colors hover:text-[#a63f04]"
              >
                <ArrowRight />
                {label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMegaOpen, setIsMobileMegaOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-[#050b0d] px-4 py-3 sm:px-6 lg:px-9">
      <nav
        aria-label="Primary navigation"
        className="container relative mx-auto rounded-[34px] bg-[#dddddd] px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03] sm:px-8"
      >
        <div className="flex min-h-12 items-center justify-between gap-5">
          <div className="block">
            <Link href="/" aria-label="Patel Legal Advisors" title="Patel Legal Advisors" className="flex min-w-0 items-center gap-3 text-white outline-none transition-opacity hover:opacity-90 focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              <Image src="/images/patel-legal-advisors-logo.svg" width={80} height={80} alt="Patel Legal Advisors Logo"/>
            </Link>
          </div>
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              href="/"
              aria-current="page"
              className="rounded-full px-6 py-3 font-bold text-black transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              Home
            </Link>

            <div className="group static">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full px-2 py-3 text-base font-semibold text-black-300 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]"
              >
                Projects
                <ChevronDown />
              </button>
              <div className="invisible absolute left-1/2 top-[calc(100%-8px)] z-30 w-[min(92vw,1430px)] -translate-x-1/2 pt-8 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-sm bg-white px-8 py-7 shadow-[0_28px_80px_rgba(0,0,0,0.16)] ring-1 ring-black/5">
                  <MegaMenuContent />
                </div>
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
              className="rounded-2xl px-4 py-3 text-base font-semibold text-[#050b0d] transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04]"
            >
              {link.label}
            </Link>
          ))}

          <div className="rounded-2xl bg-white p-3 text-[#050b0d]">
            <button
              type="button"
              aria-expanded={isMobileMegaOpen}
              onClick={() => setIsMobileMegaOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-black transition hover:bg-slate-100"
            >
              Projects
              <span className={`${isMobileMegaOpen ? "rotate-180" : ""} transition-transform`}>
                <ChevronDown />
              </span>
            </button>

            <div className={`${isMobileMegaOpen ? "block" : "hidden"} px-3 pb-2 pt-4`}>
              <MegaMenuContent
                onNavigate={() => {
                  setIsMenuOpen(false);
                  setIsMobileMegaOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
