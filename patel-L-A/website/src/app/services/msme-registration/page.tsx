import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faAward,
  faBookOpen,
  faCheckCircle,
  faChevronDown,
  faClock,
  faHeadset,
  faLandmark,
  faPhoneAlt,
  faQuestionCircle,
  faShieldAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const metaTitle = "MSME Registration Online | Udyam Registration - Patel Legal Advisors";
const metaDescription =
  "Get your MSME / Udyam Registration done online quickly. Enjoy government subsidies, lower interest rates, tax benefits and more. Expert assistance from Patel Legal Advisors.";

const title = "MSME Registration";
const heroParagraphs = [
  "Union Ministry of Micro, Small and Medium Enterprises (M/o MSMEs) has issued Gazette notification to pave way for implementation of the upward revision in the definition and criteria of MSMEs in the country. The new definition and criterion will come into effect from 1st July, 2020.",
  "After 14 years since the MSME Development Act came into existence in 2006, a revision in MSME definition was announced in the Atmnirbhar Bharat package on 13th May, 2020. As per this announcement, the definition of Micro manufacturing and services units was increased to Rs. 1 Crore of investment and Rs. 5 Crore of turnover. The limit of small unit was increased to Rs. 10 Crore of investment and Rs 50 Crore of turnover. Similarly, the limit of medium unit was increased to Rs. 50 Crore of investment and Rs. 250 Crore of turnover.",
];
const price = "STARTING FROM RS. 1499/-";
const cta = "REGISTER NOW";

const definition = {
  title: "DEFINITION OF MSME",
  paragraphs: [
    "MSME stands for Micro, Small and Medium Enterprises - any enterprise that falls under any of these three categories. MSME enterprises are the backbone of the Indian economy and are an engine of economic growth, promoting equitable development for all. MSME Enterprises are typically more labour-intensive than large corporates and provide tremendous employment potential at a very low capital cost. MSMEs also share a major portion of industrial production and exports in India and play a pivotal role in the development of the industrial economy.",
    "To promote and develop MSMEs, the MSMED Act of India facilitates the promotion and development of enterprises through many incentives, schemes and subsidies. To obtain the benefits under the MSMED Act, MSME Registration (now known as Udyam Registration) is a must. Proprietorship firms, partnership firms, LLPs, Private Limited Companies, and Public Limited Companies can all register.",
  ],
};

const overviewCard = {
  label: "Government of India",
  title: "MSMED Act, 2006",
};

const overviewHighlights = [
  {
    label: "Micro Enterprise",
    value: "Up to Rs. 1 Cr",
    detail: "Investment",
  },
  {
    label: "Small Enterprise",
    value: "Up to Rs. 10 Cr",
    detail: "Investment",
  },
  {
    label: "Medium Enterprise",
    value: "Up to Rs. 50 Cr",
    detail: "Investment",
  },
];

const benefitsTitle = "BENEFITS OF MSME REGISTRATION";

const process = {
  title: "MSME REGISTRATION PROCESS",
  steps: [
    {
      title: "Share Your Details",
      description:
        "Provide your Aadhaar number, PAN card, business details and contact information to our expert team.",
    },
    {
      title: "Document Verification",
      description:
        "Our experts verify your documents and ensure all information is accurate for a smooth registration process.",
    },
    {
      title: "Application Filing",
      description:
        "We file your Udyam Registration application on the official government portal on your behalf.",
    },
    {
      title: "Certificate Issued",
      description:
        "Receive your digitally signed Udyam Registration Certificate with a unique URN (Udyam Registration Number).",
    },
  ],
};

const faqs = [
  {
    question: "What is MSME / Udyam Registration?",
    answer:
      "MSME Registration, now known as Udyam Registration, is a government registration for Micro, Small and Medium Enterprises under the MSMED Act, 2006. It is a completely online, paperless process based on self-declaration and requires only an Aadhaar number.",
  },
  {
    question: "Who is eligible for MSME Registration?",
    answer:
      "Any business entity including proprietorship, partnership, LLP, private limited company, Hindu Undivided Family (HUF), cooperative societies, and trusts can register as an MSME, provided they meet the investment and turnover criteria.",
  },
  {
    question: "What are the criteria for Micro, Small and Medium enterprises?",
    answer:
      "Micro Enterprise: Investment up to Rs. 1 Crore & Turnover up to Rs. 5 Crore. Small Enterprise: Investment up to Rs. 10 Crore & Turnover up to Rs. 50 Crore. Medium Enterprise: Investment up to Rs. 50 Crore & Turnover up to Rs. 250 Crore.",
  },
  {
    question: "Is MSME Registration mandatory?",
    answer:
      "MSME Registration is not mandatory but is highly recommended. It unlocks numerous government benefits including subsidies, lower interest rates, tax exemptions, and priority in government tenders.",
  },
  {
    question: "What documents are required for MSME Registration?",
    answer:
      "The primary requirement is the Aadhaar number of the business owner. Additionally, PAN card, business address proof, bank account details, and information about the nature of business activity are needed.",
  },
  {
    question: "How long does MSME Registration take?",
    answer:
      "With our expert assistance, the MSME Registration process can be completed within 1-2 working days. The Udyam Registration Certificate is issued digitally.",
  },
  {
    question: "Is MSME Registration valid for lifetime?",
    answer:
      "Yes, Udyam Registration does not require renewal. Once registered, the certificate is valid for the lifetime of the enterprise. However, you should update your information if there are any changes in business details.",
  },
  {
    question: "Can I register multiple businesses under MSME?",
    answer:
      "Each enterprise requires a separate Udyam Registration. However, the same person can register multiple businesses, each with its own Udyam Registration Number (URN).",
  },
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "website",
  },
};

export default function MSMERegistrationPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main className="main">
        <section className="relative w-full overflow-hidden bg-slate-50 py-16 md:py-24">
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#a63f04]/5 blur-3xl" />
            <div className="absolute -right-48 top-1/2 h-[40rem] w-[40rem] rounded-full bg-[#a63f04]/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-slate-200/50 blur-2xl" />
          </div>

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
              <div
                className="flex w-full flex-col space-y-8 lg:w-3/5"
                data-aos="fade-right"
              >
                <div className="inline-flex w-max items-center space-x-2 rounded-full border border-[#a63f04]/20 bg-[#a63f04]/10 px-4 py-2 text-[#a63f04] shadow-sm">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-sm" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Premium Legal Services
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                  {title.split(" ").map((word, index) =>
                    word.toLowerCase() === "registration" ? (
                      <span
                        key={`${word}-${index}`}
                        className="bg-gradient-to-r from-[#a63f04] to-[#e65a05] bg-clip-text text-transparent"
                      >
                        {" "}
                        {word}
                      </span>
                    ) : (
                      <span key={`${word}-${index}`}> {word}</span>
                    ),
                  )}
                </h1>

                <div className="relative space-y-5 text-lg leading-relaxed text-slate-600">
                  <div className="absolute -left-6 bottom-2 top-2 hidden w-1 rounded-full bg-gradient-to-b from-[#a63f04] to-transparent md:block" />
                  {heroParagraphs.map((paragraph) => (
                    <p key={paragraph} className="md:pl-2">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
                    <span className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Professional Fees
                    </span>
                    <span className="text-2xl font-bold text-[#a63f04]">
                      {price}
                    </span>
                  </div>

                  <button className="group relative inline-flex items-center justify-center rounded-xl border border-transparent bg-[#a63f04] px-8 py-5 text-base font-bold text-white shadow-[0_8px_20px_rgba(166,63,4,0.25)] transition-all duration-200 hover:bg-[#8a3403] hover:shadow-[0_10px_25px_rgba(166,63,4,0.35)] focus:outline-none focus:ring-2 focus:ring-[#a63f04] focus:ring-offset-2">
                    {cta}
                    <svg
                      className="ml-2 h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-6 border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-[#a63f04]"
                    />
                    <span>100% Online</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FontAwesomeIcon icon={faClock} className="text-[#a63f04]" />
                    <span>Fast Processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="text-[#a63f04]"
                    />
                    <span>Expert Assistance</span>
                  </div>
                </div>
              </div>

              <div
                className="w-full lg:w-2/5"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#a63f04] via-[#e65a05] to-[#a63f04]" />

                  <div className="mb-8 text-center">
                    <span className="mb-1 text-2xl font-bold text-slate-900">
                      Get Expert Assistance
                    </span>
                    <p className="text-sm text-slate-500">
                      Fill the form below and our legal experts will contact you
                      shortly.
                    </p>
                  </div>

                  <form className="space-y-5">
                    <div className="space-y-1">
                      <input
                        type="text"
                        id="hero-name"
                        placeholder="Full Name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 outline-none transition-all focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="email"
                        id="hero-email"
                        placeholder="Email Address"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 outline-none transition-all focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="relative flex">
                        <span className="inline-flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          id="hero-phone"
                          placeholder="Phone Number"
                          className="w-full rounded-r-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <textarea
                        id="hero-message"
                        rows={3}
                        placeholder="Message"
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 outline-none transition-all focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20"
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full rounded-xl bg-gradient-to-r from-[#a63f04] to-[#d45205] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-[#a63f04]/30 transition-all hover:-translate-y-0.5 hover:from-[#8a3403] hover:to-[#a63f04] focus:outline-none focus:ring-2 focus:ring-[#a63f04] focus:ring-offset-2"
                    >
                      Request Callback
                    </button>
                  </form>

                  <p className="mt-6 flex items-center justify-center gap-1 text-center text-xs text-slate-400">
                    <FontAwesomeIcon icon={faShieldAlt} />
                    Your information is 100% secure & confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent" />
          <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#a63f04]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
              <div
                className="lg:sticky lg:top-32"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a63f04] text-white shadow-lg shadow-[#a63f04]/25">
                    <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">
                    Overview
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                  {definition.title}
                </h2>
                <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />

                <div className="mt-10 hidden items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm lg:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a63f04]/10 text-[#a63f04]">
                    <FontAwesomeIcon icon={faLandmark} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {overviewCard.label}
                    </p>
                    <p className="text-xs text-slate-500">{overviewCard.title}</p>
                  </div>
                </div>
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <div className="space-y-6">
                  {definition.paragraphs.map((paragraph) => (
                    <div
                      key={paragraph}
                      className="group relative border-l-2 border-slate-200 pl-6 transition-colors duration-300 hover:border-[#a63f04]"
                    >
                      <p className="text-lg leading-relaxed text-slate-600">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {overviewHighlights.map((item, idx) => (
                    <div
                      key={item.label}
                      className="group relative rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#a63f04]/30 hover:shadow-[0_16px_48px_rgba(166,63,4,0.1)]"
                      data-aos="fade-up"
                      data-aos-delay={idx * 100}
                    >
                      <p className="mb-3 text-xs font-black uppercase tracking-wider text-[#a63f04]">
                        {item.label}
                      </p>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {item.detail}
                        </p>
                        <p className="text-lg font-extrabold text-slate-800">
                          {item.value}
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-b-2xl bg-gradient-to-r from-[#a63f04] to-[#e65a05] transition-transform duration-500 group-hover:scale-x-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_25%_25%,#a63f04_0_1px,transparent_1px),radial-gradient(circle_at_75%_75%,#a63f04_0_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#a63f04]/8 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#a63f04]/5 blur-[80px]" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center" data-aos="fade-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a63f04]/25 bg-[#a63f04]/15 px-4 py-2 text-[#e65a05]">
                <FontAwesomeIcon icon={faAward} className="text-sm" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Advantages
                </span>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                {benefitsTitle}
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f8f3ee] py-16 md:py-24">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#a63f04_1px,transparent_1px),linear-gradient(90deg,#a63f04_1px,transparent_1px)] [background-size:60px_60px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#a63f04]/8 blur-[80px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#d29f81]/15 blur-[60px]" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center" data-aos="fade-up">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">
                How It Works
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                {process.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                A simple, streamlined process to get your registration done with
                expert guidance at every step.
              </p>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {process.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="relative"
                  data-aos="fade-up"
                  data-aos-delay={idx * 120}
                >
                  {idx < process.steps.length - 1 && (
                    <div className="absolute left-[calc(50%+40px)] right-0 top-10 z-0 hidden h-[2px] lg:block">
                      <div className="relative h-full w-full bg-gradient-to-r from-[#a63f04]/30 to-[#a63f04]/10">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#a63f04]/40">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="group relative z-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#a63f04]/25 hover:shadow-[0_20px_60px_rgba(166,63,4,0.12)]">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a63f04] to-[#d45205] text-2xl font-black text-white shadow-lg shadow-[#a63f04]/25 transition-transform duration-300 group-hover:scale-110">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <h3 className="mb-3 text-xl font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#a63f04]/15 to-transparent" />
          <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#a63f04]/5 blur-[100px]" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
              <div
                className="self-start lg:sticky lg:top-32"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a63f04] text-white shadow-lg shadow-[#a63f04]/25">
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="text-lg"
                    />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">
                    FAQ
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-500">
                  Find answers to the most common questions about the
                  registration process, eligibility, and benefits.
                </p>
                <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
              </div>

              <div
                className="space-y-3"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                {faqs.map((faq, idx) => (
                  <details
                    key={faq.question}
                    open={idx === 0}
                    className="faq-item group rounded-2xl border border-slate-200 bg-white transition-all duration-300 open:border-[#a63f04]/25 open:bg-gradient-to-r open:from-[#a63f04]/[0.03] open:to-transparent open:shadow-[0_8px_32px_rgba(166,63,4,0.08)] hover:border-slate-300"
                  >
                    <summary className="flex w-full cursor-pointer list-none items-center gap-4 rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2 md:p-6 [&::-webkit-details-marker]:hidden">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-500 transition-all duration-300 group-open:bg-[#a63f04] group-open:text-white group-open:shadow-md group-open:shadow-[#a63f04]/25 group-hover:bg-[#a63f04]/10 group-hover:text-[#a63f04]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1 text-base font-bold text-slate-800 transition-colors duration-300 group-open:text-[#a63f04]">
                        {faq.question}
                      </span>

                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="faq-chevron flex-shrink-0 text-sm text-slate-400 transition-transform duration-300"
                      />
                    </summary>

                    <div className="px-5 pb-5 pl-[4.25rem] md:px-6 md:pb-6 md:pl-[4.75rem]">
                      <p className="text-base leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#141617] py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a63f04]/15 via-transparent to-[#a63f04]/5" />
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#a63f04]/30 to-transparent" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#a63f04]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#d29f81]/10 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:50px_50px]" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div data-aos="fade-right" data-aos-duration="800">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a63f04] text-white shadow-lg shadow-[#a63f04]/30">
                    <FontAwesomeIcon icon={faHeadset} className="text-lg" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d29f81]">
                    Get Started Today
                  </span>
                </div>

                <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                  Ready to Register Your{" "}
                  <span className="bg-gradient-to-r from-[#e65a05] to-[#d29f81] bg-clip-text text-transparent">
                    Business as MSME?
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                  Our expert team of CAs, CS & Lawyers will guide you through
                  the entire registration process. Get started in minutes.
                </p>
              </div>

              <div
                className="flex flex-col gap-4 sm:flex-row"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <Link
                  href="/contact-us"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#a63f04] px-8 py-5 text-base font-bold text-white shadow-[0_8px_24px_rgba(166,63,4,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8a3403] hover:shadow-[0_12px_32px_rgba(166,63,4,0.45)]"
                >
                  {cta}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="tel:+919680719296"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/20 px-8 py-5 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#a63f04] hover:bg-[#a63f04]/10"
                >
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  Call Us Now
                </Link>
              </div>
            </div>

            <div
              className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {[
                { number: "28k+", label: "Happy Clients" },
                { number: "5+", label: "Years Experience" },
                { number: "100%", label: "Online Process" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <p className="text-3xl font-black text-[#e65a05]">
                    {item.number}
                  </p>
                  <p className="text-sm font-bold text-white/50">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
      <style>{`
        .faq-item[open] .faq-chevron {
          color: #a63f04;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
