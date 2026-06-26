import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faAward,
  faBookOpen,
  faCheckCircle,
  faClock,
  faCreditCard,
  faLandmark,
  faPhoneAlt,
  faShieldAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const metaTitle = "Public Limited Company Incorporation | PATEL LEGAL ADVISORS";
const metaDescription =
  "A Public Limited Company (PLC), also known as a Publicly Traded Company or Incorporated Company, is a type of business entity that offers its shares to the general public, allowing them to be traded on a stock exchange. PLCs are a common form of corporate structure used by medium to large-sized companies to raise capital from a wide range of investors.";

const title = "Public Limited Company";
const heroParagraphs = [
  "A Public Limited Company (PLC), also known as a Publicly Traded Company or Incorporated Company, is a type of business entity that offers its shares to the general public, allowing them to be traded on a stock exchange. PLCs are a common form of corporate structure used by medium to large-sized companies to raise capital from a wide range of investors.",
];
const price = "STARTING FROM RS. 28999/-";
const cta = "KNOW ABOUT PACKAGE";

const definition = {
  title: "About Public Limited Company",
  paragraphs: [
    "Limited Liability: Like other corporate structures, a PLC offers limited liability to its shareholders. This means that the personal assets of shareholders are generally protected, and their liability is limited to the extent of their shareholding in the company.",
    "Share Capital: PLCs must have a significant amount of share capital, which is divided into shares that can be publicly traded. The capital is typically raised through an initial public offering (IPO), where shares are sold to investors in exchange for capital.",
    "Public Offering: A distinguishing feature of a PLC is that its shares are publicly offered and listed on a stock exchange, making them available for purchase by the general public. This allows the company to raise substantial capital from a large number of shareholders.",
    "Regulatory Compliance: PLCs are subject to stringent regulatory requirements and corporate governance standards. These regulations are designed to protect the interests of shareholders and the general public.",
    "Financial Transparency: PLCs are required to disclose their financial information, including financial statements, annual reports, and other relevant information, to the public and regulatory authorities. This transparency helps investors make informed decisions.",
    "Board of Directors: PLCs have a board of directors responsible for overseeing the company's operations and making strategic decisions. The board is elected by shareholders and includes executive and non-executive directors.",
    "Shareholder Rights: Shareholders of PLCs have certain rights, including the right to vote at general meetings, the right to receive dividends, and the right to participate in the company's decision-making process.",
    "Transferability of Shares: One of the advantages of a PLC is the ease with which shares can be bought and sold on the stock exchange. Shareholders can sell their shares to other investors without the need for approval from the company.",
    "Corporate Governance: PLCs often have more elaborate corporate governance structures, including committees such as audit committees, remuneration committees, and nomination committees, to ensure proper oversight and accountability.",
    "Market Capitalization: The value of a PLC is often measured by its market capitalization, which is the total value of its outstanding shares multiplied by the current market price of those shares. This metric is used to compare companies and assess their relative size in the market.",
    "Dividends and Profit Distribution: PLCs may distribute profits to shareholders in the form of dividends, which are typically paid out of the company's earnings.",
  ],
};

const benefitsSection = {
  title: "Process of pub.ltd. Incorporation",
  paragraphTitles: [
    "Choose a Company Name",
    "Select a Company Formation Package",
    "Add Company Address Services",
    "Complete the Checklist Provided by Us",
  ],
  paragraphs: [
    "To find out the availability of your proposed name, simply enter it into our online company name-check tool. This system will compare any name you enter against the Index of Company Names at Companies House.",
    "We offer a wide selection of packages for companies limited by shares, in addition to tailor-made packages for Non-UK Residents, companies limited by guarantee, Public Limited Companies (PLCs), and Limited Liability Partnerships (LLPs).",
    "All limited companies must provide details of a registered office. A service address must also be supplied by each director, subscriber, company secretary, and Person with Significant Control (PSC).",
    "Our online application form is really easy to complete, requiring only a few minutes of your time. You must provide the following information: Company name, Registered office address, Description of main business activities (SIC code), PAN of the Directors - self attested color copies, Aadhar card of the Director and Nominee – self attested color copies, Passport sized Photograph of the Director and Nominee, Driving licence / voter ID of the Director and Nominee, Electricity Bill/water Bill/ Gas bill/ Bank statement of the Director and Nominee, Electricity Bill/water Bill/ Gas bill of the registered office",
  ],
};

const pricing = [
  {
    title: "Basic",
    price: "Rs. 28999/-",
    note: "Stamp duty included",
    features: [
      "3 DIN & 7 DSC",
      "1 Name Approval Letter",
      "Stamp duty on Authorized Capital upto INR 1 Lakh",
      "Certificate of Incorporation",
      "Copy of MOA & AOA (E-Copy)",
      "E-PAN & E-TAN",
      "ESIC Registration through SPICe Plus",
      "PF Registration through SPICe Plus",
      "Bank Account opening through SPICe Plus",
    ],
  },
  {
    title: "Standard",
    price: "Rs. 31999/-",
    note: "Stamp duty included",
    features: [
      "3 DIN & 7 DSC",
      "1 Name Approval Letter",
      "Stamp duty on Authorized Capital upto INR 1 Lakh",
      "Certificate of Incorporation",
      "Copy of MOA & AOA (E-Copy)",
      "E-PAN & E-TAN",
      "Share Certificates",
      "ESIC Registration through SPICe Plus",
      "PF Registration through SPICe Plus",
      "Bank Account opening through SPICe Plus",
      "MSME Registration",
      "GST Registration",
      "INC 20A filing",
    ],
  },
  {
    title: "Professional",
    price: "Rs. 33999/-",
    note: "Stamp duty included",
    features: [
      "3 DIN & 7 DSC",
      "1 Name Approval Letter",
      "Stamp duty on Authorized Capital upto INR 1 Lakh",
      "Certificate of Incorporation",
      "Copy of MOA & AOA (E-Copy)",
      "E-PAN & E-TAN",
      "Share Certificates",
      "ESIC Registration through SPICe Plus",
      "PF Registration through SPICe Plus",
      "Bank Account opening through SPICe Plus",
      "MSME Registration",
      "GST Registration",
      "INC 20A filing",
      "Appointment of 1st Auditor (Form ADT-1)",
    ],
  },
];

const process = {
  title: "How to Incorporate a Company",
  steps: [
    "Apply for Reserve Your Company Name",
    "Apply for Digital Signature Certificate (DSC)",
    "Submission of Forms for Incorporate a Company",
    "Obtain Company's Incorporation Certificate",
    "Obtain Company's PAN Card and TAN Card",
  ],
};

const incorporationSupportSteps = [
  {
    title: "Documents Verification",
    description:
      "One of the person from our team will collect all the imformation and documents for incorporate company. All documents should be signed. After reciveing documents our expert will verify the same and they will update you time to time for the same.",
  },
  {
    title: "Approval of Name",
    description:
      "Once the verification is complete our team will apply for name approval of company which name is given by you. After that they will apply for Digital Signature Certificate also.",
  },
  {
    title: "Certification",
    description:
      "Our team will draft the MOA (Memorandum of association) and AOA (Articles of association) and they will also file all the mandatory forms. Once Certificate of incoporation, PAN & TAN recived you can apply for your bank account open.",
  },
];

const whyUsFeatures = [
  {
    title: "We Make Your Dream Come True",
    description:
      "We are a team of experienced professionals who will complete your project successfully.",
    icon: faAward,
  },
  {
    title: "Best Price for Excellent Work",
    description: "Reasonable price and best service.",
    icon: faCheckCircle,
  },
  {
    title: "We Hear You",
    description: "We always anticipate what you expect.",
    icon: faUserTie,
  },
  {
    title: "Mon-sat Support",
    description: "We're always online on office time!",
    icon: faPhoneAlt,
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

export default function publiclimitedcompanyincorporationPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
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
                  {title}
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

        <section className="relative bg-white py-16 md:py-24">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent" />
          <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#a63f04]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:items-stretch lg:gap-16">
              <div className="self-stretch">
                <div className="lg:sticky lg:top-36">
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
                {benefitsSection.title}
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {benefitsSection.paragraphTitles.map((benefitTitle, idx) => (
                <div
                  key={benefitTitle}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#a63f04]/30 hover:bg-white/[0.07]"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#a63f04]/20 font-bold text-[#e65a05]">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-bold">{benefitTitle}</h3>
                      <p className="text-base leading-relaxed text-slate-400">
                        {benefitsSection.paragraphs[idx]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent" />
          <div className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-[#a63f04]/5 blur-3xl" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center" data-aos="fade-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a63f04]/20 bg-[#a63f04]/10 px-4 py-2 text-[#a63f04]">
                <FontAwesomeIcon icon={faCreditCard} className="text-sm" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Pricing
                </span>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                Choose Your Package
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Compare the service packages and choose the level of support
                that fits your business.
              </p>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
              {pricing.map((plan, idx) => {
                const featured = idx === 1;

                return (
                  <article
                    key={plan.title}
                    className={`group relative flex min-h-[620px] flex-col overflow-hidden border bg-white p-7 shadow-[0_24px_80px_rgba(20,22,23,0.08)] transition-all duration-500 hover:-translate-y-2 sm:p-8 ${
                      featured
                        ? "border-[#a63f04]/35 shadow-[0_32px_100px_rgba(166,63,4,0.16)]"
                        : "border-slate-200 hover:border-[#a63f04]/25 hover:shadow-[0_32px_95px_rgba(166,63,4,0.12)]"
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={idx * 120}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 transition-transform duration-500 group-hover:scale-x-100 ${
                        featured ? "bg-[#a63f04]" : "bg-[#e65a05]"
                      }`}
                    />

                    <div>
                      <h3 className="text-lg font-black text-[#e65a05]">
                        {plan.title}
                      </h3>
                      <div className="mt-4">
                        <p className="text-4xl font-black leading-none tracking-normal text-slate-950 sm:text-5xl">
                          {plan.price}
                        </p>
                      </div>
                      <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[#a63f04]">
                        {plan.note}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        All inclusive
                      </p>
                    </div>

                    <div className="my-7 h-px w-full bg-slate-200" />

                    <ul className="space-y-3.5 mb-5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-3 text-sm font-medium leading-6 text-slate-600"
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full text-[#a63f04]"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact-us"
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-[#a63f04] px-6 py-3 text-sm font-black text-white transition duration-300 hover:bg-[#a63f04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2"
                    >
                      More Info
                      <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
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
                  key={step}
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
                      {step}
                    </h3>
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
            <div className="grid gap-8 lg:grid-cols-3">
              {incorporationSupportSteps.map((step, idx) => (
                <article
                  key={step.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(20,22,23,0.07)] transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/30 hover:shadow-[0_32px_100px_rgba(166,63,4,0.14)]"
                  data-aos="fade-up"
                  data-aos-delay={idx * 120}
                >
                  <div className="absolute right-5 top-5 text-7xl font-black leading-none text-[#a63f04]/[0.05] transition duration-500 group-hover:text-[#a63f04]/10">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10">
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a63f04]/10 text-[#a63f04] transition duration-500 group-hover:bg-[#a63f04] group-hover:text-white">
                      <FontAwesomeIcon
                        icon={
                          idx === 0
                            ? faShieldAlt
                            : idx === 1
                              ? faLandmark
                              : faCheckCircle
                        }
                        className="h-5 w-5"
                      />
                    </div>
                    <h2 className="font-black tracking-[0.08em] text-slate-950">
                      {step.title}
                    </h2>
                    <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
                    <p className="mt-5 text-base leading-8 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f8f3ee] py-16 md:py-24">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#a63f04_1px,transparent_1px),linear-gradient(90deg,#a63f04_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#d29f81]/20 blur-[90px]" />
          <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-[#a63f04]/10 blur-[100px]" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center" data-aos="fade-up">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">
                Why Us?
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                Why Us?
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {whyUsFeatures.map((feature, idx) => (
                <article
                  key={feature.title}
                  className="group relative min-h-64 overflow-hidden rounded-2xl border border-[#a63f04]/10 bg-white/85 p-6 shadow-[0_22px_80px_rgba(20,22,23,0.08)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/35 hover:bg-white hover:shadow-[0_32px_100px_rgba(166,63,4,0.16)]"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="absolute right-4 top-4 text-6xl font-black leading-none text-[#a63f04]/[0.05] transition duration-500 group-hover:text-[#a63f04]/10">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10">
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#141617] text-white shadow-[0_16px_36px_rgba(20,22,23,0.16)] transition duration-500 group-hover:bg-[#a63f04]">
                      <FontAwesomeIcon icon={feature.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-black leading-6 tracking-[0.08em] text-[#a63f04]">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
