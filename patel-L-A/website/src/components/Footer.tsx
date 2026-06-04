import Link from "next/link";
import Image from "next/image";

const socialLinks = ["f", "X", "in", "yt"];

const officeInfo = [
  {
    label: "Call Us",
    value: "+91 9680719296",
    href: "tel:+919680719296",
    icon: "phone",
  },
  {
    label: "Email Support",
    value: "support@pateladvisors.in",
    href: "mailto:support@pateladvisors.in",
    icon: "mail",
  },
  {
    label: "Serving",
    value: "Businesses Pan India",
    href: "/contact-us",
    icon: "pin",
  },
];

const services = [
  "Company / LLP Registration",
  "GST & FSSAI Registration",
  "Compliance Management",
  "Tax Preparation",
  "Accounting & Bookkeeping",
];

const paymentModes = [
  {
    name: "UPI",
    className: "text-[#4b5563]",
    accent: "from-[#7c7c7c] to-[#f59e0b]",
  },
  {
    name: "RuPay",
    className: "text-[#29356f]",
    accent: "from-[#2f6ab3] to-[#48a348]",
  },
  {
    name: "VISA",
    className: "text-[#183b8f]",
    accent: "from-[#183b8f] to-[#183b8f]",
  },
  {
    name: "MasterCard",
    className: "text-[#ffffff]",
    accent: "from-[#ef4444] to-[#f59e0b]",
  },
  {
    name: "PayPal",
    className: "text-[#154c9f]",
    accent: "from-[#154c9f] to-[#27a3e6]",
  },
  {
    name: "AMEX",
    className: "text-[#ffffff]",
    accent: "from-[#2f80ed] to-[#1d9bd7]",
  },
];

function InfoIcon({ type }: { type: string }) {
  if (type === "mail") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PaymentBadge({
  mode,
}: {
  mode: { name: string; className: string; accent: string };
}) {
  const isFilled = mode.name === "MasterCard" || mode.name === "AMEX";

  return (
    <span
      className={`relative inline-flex h-11 min-w-[86px] items-center justify-center overflow-hidden rounded-md border px-4 text-sm font-black italic tracking-tight shadow-sm transition duration-300 hover:-translate-y-1 ${
        isFilled
          ? `border-transparent bg-gradient-to-r ${mode.accent} ${mode.className}`
          : `border-black/10 bg-white ${mode.className}`
      }`}
    >
      {!isFilled && (
        <span
          className={`absolute bottom-0 right-0 h-1.5 w-12 rounded-tl-full bg-gradient-to-r ${mode.accent}`}
        />
      )}
      {mode.name}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f8f3ee] text-[#141617]">
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#141617_1px,transparent_1px),linear-gradient(90deg,#141617_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#a63f04]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#d29f81]/25 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-9 lg:py-20">
        <div className="rounded-lg border border-[#a63f04]/15 bg-white/75 p-6 shadow-[0_30px_100px_rgba(166,63,4,0.10)] backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_0.9fr] lg:gap-14">
            <div>
              <Link
                href="/"
                aria-label="Patel Legal Advisors"
                title="Patel Legal Advisors"
                className="inline-flex min-w-0 items-center outline-none transition-opacity hover:opacity-90 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#a63f04]/60 focus-visible:ring-offset-2"
              >
                <Image
                  src="/images/patel-legal-advisors-logo.svg"
                  width={150}
                  height={88}
                  alt="Patel Legal Advisors logo"
                />
              </Link>

              <p className="mt-7 max-w-sm text-base leading-8 text-[#515455]">
                Complete legal, compliance, registration, tax, accounting, and
                bookkeeping support for startups and businesses across India.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item}
                    href="#"
                    aria-label={`Social link ${item}`}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/5 bg-[#f8f3ee] text-sm font-black text-[#141617] transition hover:-translate-y-1 hover:bg-[#a63f04] hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black">Office Information</h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-[#a63f04]" />

              <div className="mt-7 space-y-5">
                {officeInfo.map((item) => (
                  <Link
                    key={`${item.label}-${item.value}`}
                    href={item.href}
                    className="group flex gap-4 rounded-lg border border-black/5 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#a63f04]/25 hover:shadow-[0_18px_55px_rgba(166,63,4,0.12)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5e8df] text-[#a63f04] transition group-hover:bg-[#a63f04] group-hover:text-white">
                      <InfoIcon type={item.icon} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#515455]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-base font-black">
                        {item.value}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black">Our Services</h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-[#a63f04]" />

              <nav className="mt-7 space-y-4" aria-label="Footer services">
                {services.map((service) => (
                  <Link
                    key={service}
                    href="/contact-us"
                    className="group flex items-center gap-3 text-base font-bold text-[#515455] transition hover:text-[#a63f04]"
                  >
                    <span className="text-[#a63f04] transition group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                    {service}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-[#a63f04]/15 bg-[#fdfbf8] px-5 py-6 text-center shadow-inner">
            <h2 className="text-xl font-black text-[#ff4b00]">
              Secure Payment Modes
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {paymentModes.map((mode) => (
                <PaymentBadge key={mode.name} mode={mode} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#a63f04]/15 bg-white/65 px-6 py-6 text-center text-sm font-bold text-[#515455]">
        Patel Legal Advisors - Copyright All rights reserved.
      </div>
    </footer>
  );
}
