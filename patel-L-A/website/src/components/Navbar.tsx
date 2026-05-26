"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";


type NavLink = {
  label: string;
  href: string;
};

type MegaMenuGroup = {
  title: string;
  links: string[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" }
];

const megaMenuGroups: MegaMenuGroup[] = [
  {
    title: "Start-Up",
    links: [
      "Private Limited Company Incorporation",
      "Section 8 Company Incorporation",
      "One Person Company Incorporation",
      "Public Limited Company Incorporation",
      "Nidhi Company Incorporation",
      "Producer Company Incorporation",
      "LLP Incorporation",
      "Proprietorship Registration",
      "Partnership Registration",
      "Hindu Undivided Family",
    ],
  },
  {
    title: "Commercial",
    links: [
      "Change Of Director",
      "Change In Partners",
      "Change In DIN",
      "Change In Company Address",
      "Director-KYC",
      "Transfer Of Share",
      "DIN Surrender",
      "Increase Authorise Capital",
      "Increase Paid-Up Capital",
      "INC-20A Filing",
      "ROC Search Report",
      "MOA/AOA Printing",
      "Appointment of Auditor",
    ],
  },
  {
    title: "Registration",
    links: [
      "MSME Registration",
      "DIN Application",
      "IEC Application",
      "FSSAI Registration",
      "PSARA Registration",
      "Digital Signature Certificate",
      "PAN & TAN Application",
      "Trademark Registration",
      "EPF Registration",
      "ESI Registration",
      "APEDA Registration",
    ],
  },
  {
    title: "GST Services",
    links: [
      "GST Registration",
      "GST Monthly Return",
      "GST Annual Return",
      "GST Modification",
      "LUT Under GST",
      "E-Way Bill Under GST",
      "GST Cancellation",
    ],
  },
  {
    title: "Compliances",
    links: [
      "Company Annual filing",
      "OPC Annual filing",
      "Pub. Ltd. Annual filing",
      "Section 8 Annual filing",
      "Nidhi Annual filing",
      "Producer Annual filing",
      "LLP Annual filing",
      "Accounting & Bookkeeping",
    ],
  },
  {
    title: "Returns",
    links: [
      "Taxation & ITR",
      "PF Return",
      "TDS Return",
      "ESI Return",
    ],
  },
  {
    title: "Agreements",
    links: [
      "Lease Agreement",
      "Rent Agreement",
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

function FolderIcon({ className = "h-6 w-6 text-[#a63f04]" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
  const [activeGroup, setActiveGroup] = useState(megaMenuGroups[0]);

  return (
    <div className="grid overflow-hidden rounded-lg bg-white shadow-[0_28px_80px_rgba(0,0,0,0.16)] ring-1 ring-black/5 lg:min-h-[430px] lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="bg-[#100f16] p-3 text-white lg:p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {megaMenuGroups.map((group) => {
            const isActive = group.title === activeGroup.title;

            return (
              <button
                key={group.title}
                type="button"
                onMouseEnter={() => setActiveGroup(group)}
                onFocus={() => setActiveGroup(group)}
                onClick={() => setActiveGroup(group)}
                className={`flex min-h-14 w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                  isActive
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-white hover:bg-white/10"
                }`}
                aria-pressed={isActive}
              >
                <FolderIcon className="h-5 w-5 shrink-0 text-current" />
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-5 lg:p-7">
        <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
          <FolderIcon />
          <h3 className="text-lg font-black text-[#050b0d]">{activeGroup.title}</h3>
        </div>

        <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
          {activeGroup.links.map((label) => (
            <Link
              key={`${activeGroup.title}-${label}`}
              href={`/${slugify(label)}`}
              onClick={onNavigate}
              className="group/link flex min-h-12 items-center gap-2 border-b border-slate-100 py-3 text-sm font-bold text-[#050b0d] transition-colors hover:text-[var(--primary-color)]"
            >
              <ArrowRight />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileServicesMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [activeGroupTitle, setActiveGroupTitle] = useState(megaMenuGroups[0].title);

  return (
    <div className="overflow-hidden rounded-none bg-[#06030d] text-white">
      {megaMenuGroups.map((group) => {
        const isOpen = group.title === activeGroupTitle;

        return (
          <div key={group.title} className="border-b border-white/10">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setActiveGroupTitle(isOpen ? "" : group.title)}
              className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-black text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            >
              <span>{group.title}</span>
              <span className={`${isOpen ? "rotate-180" : ""} shrink-0 transition-transform`}>
                <ChevronDown />
              </span>
            </button>

            <div className={isOpen ? "block" : "hidden"}>
              {group.links.map((label) => (
                <Link
                  key={`${group.title}-${label}`}
                  href={`/${slugify(label)}`}
                  onClick={onNavigate}
                  className="block border-t border-white/10 px-5 py-4 text-sm font-bold text-white transition-colors hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMegaOpen, setIsMobileMegaOpen] = useState(false);

  return (
    <header className="z-50 w-full">
      <nav aria-label="Primary navigation" className="w-full bg-gray-100">
        <div className="nav-top py-2 px-3 border-b border-gray-400 bg-black text-white">
          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="block">
              <span>Are you ready to grow up your business? <Link href="/contact-us" aria-label="Patel Legal Advisors" title="Contact To Growth With Us" className="text-primary font-bold">Contact US <FontAwesomeIcon icon={faArrowRight} /></Link></span>
            </div>
            <div className="flex items-center gap-4">
              <span><Link href="tel:+919680719296" aria-label="Patel Legal Advisors" title="Contact To Growth With Us"><FontAwesomeIcon icon={faPhone} /> +91 9680719296</Link></span>
              <span><Link href="mailto:support@pateladvisors.in" aria-label="Patel Legal Advisors" title="Contact To Growth With Us"><FontAwesomeIcon icon={faEnvelope} /> support@pateladvisors.in</Link></span>
            </div> 
          </div>
        </div>
        <div className="flex px-3 items-center justify-between gap-5 relative">
          <div className="block">
            <Link href="/" aria-label="Patel Legal Advisors" title="Patel Legal Advisors" className="flex min-w-0 items-center gap-3 text-white outline-none transition-opacity hover:opacity-90 focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              <Image src="/images/patel-legal-advisors-logo.svg" width={80} height={80} alt=" Logo"/>
            </Link>
          </div>
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              href="/"
              aria-current="page"
              className="rounded-full px-6 py-5 font-bold text-black transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              Home
            </Link>
            <Link
              href="/about-us"
              aria-current="page"
              className="rounded-full px-6 py-5 font-bold text-black transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              About Us
            </Link>

            <div className="group static">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full px-6 py-7 font-bold text-black transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]"
              >
                Services
                <ChevronDown />
              </button>
              <div className="invisible absolute left-1/2 top-[calc(100%-0px)] z-30 w-full  max-w-[1100px] -translate-x-1/2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <MegaMenuContent />
              </div>
            </div>
             <Link
              href="/msme-registration"
              aria-current="page"
              className="rounded-full px-6 py-5 font-bold text-black transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121d22]">
              MSME Registration
            </Link>

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
          <div className="block">
            <Link
              href="/contact-us"
              aria-current="page"
              className="btn-custom btn-primary">
              Contact Us <FontAwesomeIcon icon={faArrowRight} />
            </Link>
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
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-2xl px-4 py-3 text-base font-semibold text-[#050b0d] transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04]"
          >
            Home
          </Link>
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-2xl px-4 py-3 text-base font-semibold text-[#050b0d] transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04]"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-2xl px-4 py-3 text-base font-semibold text-[#050b0d] transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04]"
          >
            About Us
          </Link>

          <div className="overflow-hidden bg-black text-white">
            <button
              type="button"
              aria-expanded={isMobileMegaOpen}
              onClick={() => setIsMobileMegaOpen((current) => !current)}
              className="flex min-h-14 w-full items-center justify-between px-5 py-4 text-base font-black transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            >
              Services
              <span className={`${isMobileMegaOpen ? "rotate-180" : ""} transition-transform`}>
                <ChevronDown />
              </span>
            </button>

            <div className={isMobileMegaOpen ? "block" : "hidden"}>
              <MobileServicesMenu
                onNavigate={() => {
                  setIsMenuOpen(false);
                  setIsMobileMegaOpen(false);
                }}
              />
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-[#050b0d] transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
