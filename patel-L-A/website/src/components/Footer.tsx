import Link from "next/link";

const socialLinks = ["f", "X", "◎", "in", "s"];

const officeInfo = [
  {
    label: "Call Us 24/7",
    value: "(+256) 2145.2156",
    icon: "phone",
  },
  {
    label: "info@Invena.com",
    value: "(+256) 2145.2156",
    icon: "mail",
  },
  {
    label: "Our Location",
    value: "125Town United State",
    icon: "pin",
  },
];

const services = [
  "Business Solution",
  "Investment Policy",
  "Market Research",
  "Strategy Growth",
  "Finance Solution",
];

function BrandIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a63f04] text-white">
      <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 20 7-7 5 5 9-10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h8v8" />
      </svg>
    </span>
  );
}

function InfoIcon({ type }: { type: string }) {
  if (type === "mail") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7] text-[#071226]">
      <div className="container mx-auto max-w-7xl px-6 py-16 sm:px-9 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_0.85fr] lg:gap-20">
          <div>
            <Link href="/" aria-label="Invena home" className="inline-flex items-center gap-4">
              <BrandIcon />
              <span>
                <span className="block text-4xl font-black leading-none">Invena</span>
                <span className="block text-sm font-semibold text-slate-600">
                  Business Solution
                </span>
              </span>
            </Link>

            <p className="mt-10 max-w-sm text-base leading-8 text-slate-600">
              Felis consequat magnis fames sagittis ultrices plasodales
              porttitor quisque ultrice tempor turpis.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  aria-label={`Social link ${item}`}
                  className="flex h-11 w-11 items-center justify-center rounded bg-[#e9e9e9] text-base font-black text-[#071226] transition hover:-translate-y-1 hover:bg-[#a63f04] hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black">Office Information</h2>
            <div className="mt-7 text-2xl font-black tracking-[0.1em]">-------</div>

            <div className="mt-7 space-y-7">
              {officeInfo.map((item) => (
                <div key={`${item.label}-${item.value}`} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#a63f04] shadow-[0_10px_30px_rgba(7,18,38,0.05)]">
                    <InfoIcon type={item.icon} />
                  </span>
                  <span>
                    <span className="block text-base text-slate-600">{item.label}</span>
                    <span className="mt-2 block text-base font-black">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black">Our Services</h2>
            <div className="mt-7 text-2xl font-black tracking-[0.1em]">-------</div>

            <nav className="mt-8 space-y-5" aria-label="Footer services">
              {services.map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="group flex items-center gap-4 text-base text-slate-600 transition hover:text-[#a63f04]"
                >
                  <span className="text-[#071226] transition group-hover:translate-x-1 group-hover:text-[#a63f04]">
                    <ArrowIcon />
                  </span>
                  {service}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-8 text-center text-base text-[#071226]">
        Invena - Copyright All rights reserved.
      </div>
    </footer>
  );
}
