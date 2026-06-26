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
  faIdCard,
  faFingerprint,
  faBuildingColumns,
  faShieldHeart,
  faBriefcaseMedical,
  faPiggyBank,
  faFileInvoiceDollar,
  faFileContract,
  faBook,
  faScaleBalanced,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";




const metaTitle = "Taxation & ITR | PATEL LEGAL ADVISORS";
const metaDescription ="taxation, imposition of compulsory levies on individuals or entities by governments. Taxes are levied in almost every country of the world, primarily to raise revenue for government expenditures, although they serve other purposes as well. ITR is the form in which assesses file information about his/her income and tax thereon to IT Department. Various forms are ITR 1, ITR 2, ITR 3, ITR 4, ITR 5, ITR 6 and ITR 7. When you file a belated return, you are not allowed to carry forward certain losses.";

const title = "Taxation & ITR";
const heroParagraphs = [
  "Taxation: taxation, imposition of compulsory levies on individuals or entities by governments. Taxes are levied in almost every country of the world, primarily to raise revenue for government expenditures, although they serve other purposes as well. This article is concerned with taxation in general, its principles, its objectives, and its effects; specifically, the article discusses the nature and purposes of taxation, whether taxes should be classified as direct or indirect, the history of taxation, canons and criteria of taxation, and economic effects of taxation, including shifting and incidence.",
  "ITR: Income tax return is the form in which assesses file information about his/her income and tax thereon to Income Tax Department. Various forms are ITR 1, ITR 2, ITR 3, ITR 4, ITR 5, ITR 6 and ITR 7. When you file a belated return, you are not allowed to carry forward certain losses."
];
const price = "STARTING FROM RS. 1499/-";
const cta = "KNOW ABOUT PACKAGE";

const definition = {
  title: "Types of Taxes in India",
  paragraphs: [
    "Taxation in India is majorly divided into Central and State Govt taxes with two types of taxes: 01. Direct Taxes, 02. Indirect Taxes",
    "While direct taxes are levied on your earnings in India, indirect taxes are levied on expenses. The responsibility to deposit the direct tax liability lies with the earning party, whether individual, HUF or a company.", 
    "Indirect taxes are collected majorly by the corporates and businesses providing services and products. Thus, the responsibility to deposit indirect taxes lies with these entities.",
  ],
};


const requirement  = [  
   {
    subtitle: "What is Direct Tax?",
    paragraphs: ["Direct taxes are imposed on corporate entities and individuals. These taxes cannot be transferred to others. For individual taxpayers like you, the most important type of Direct tax is the income tax. This tax is levied during each assessment year (1st April to 31st March). As per the Income Tax Act, 1961, it is mandatory for you to make income tax payments if your annual income is above the minimum exemption limit. You can get tax benefits under various sections of the Act. Before we talk about tax benefits, it is important for you to understand the income tax slab.",]
  },
   {
    subtitle: "What Are the Different Types of Indirect Taxes in India?",
    paragraphs: ["Indirect taxes in India have been the most consistent and largest revenue source for the government. The Indian tax system has had multiple indirect taxes, some of these are still operational:",
      "(a) Service Tax, (b) Indian Excise Duty, (c) Value Added Tax (VAT), (d) Customs Duty, (e) Securities Transaction Tax (STT), (f) Stamp Duty, (g) Entertainment Tax",
      "Few of the indirect taxes in India like service tax, value-added tax and excise duty have been removed for a large number of goods and services. These taxes have been replaced by a single Goods and Services Tax.",
      "Customs duty tax applies to the goods being imported into India from other countries, and in a few cases on the goods being exported from India."
    ]
  },
   {
    subtitle: "What is Income Tax Return?",
    paragraphs: ["An Income tax return (ITR) is a form used to file information about your income and tax to the Income Tax Department. The tax liability of a taxpayer is calculated based on his or her income. In case the return shows that excess tax has been paid during a year, then the individual will be eligible to receive a income tax refund from the Income Tax Department.",
      "As per the income tax laws, the return must be filed every year by an individual or business that earns any income during a financial year. The income could be in the form of a salary, business profits, income from house property or earned through dividends, capital gains, interests or other sources.",
      "Tax returns have to be filed by an individual or a business before a specified date. If a taxpayer fails to abide by the deadline, he or she has to pay a penalty.",
    ]
  },  
];


const individualDocs = [
  { icon: faIdCard, text: "PAN Card" },
  { icon: faFingerprint, text: "Aadhar Card" },
  { icon: faBuildingColumns, text: "Bank Statement" },
  { icon: faShieldHeart, text: "Life Insurance Details" },
  { icon: faBriefcaseMedical, text: "Mediclaim Details" },
  { icon: faPiggyBank, text: "PPF or Other Tax Saving Investment" },
  { icon: faFileInvoiceDollar, text: "Salary Slip" },
  { icon: faFileContract, text: "Sale/Purchase Bills (If Business Income)" },
];

const businessDocs = [
  { icon: faIdCard, text: "PAN Card of Firm" },
  { icon: faBuildingColumns, text: "Bank Statement" },
  { icon: faScaleBalanced, text: "Balance Sheet" },
  { icon: faMagnifyingGlass, text: "Audit Report (If Applicable)" },
  { icon: faFileInvoiceDollar, text: "TDS Certificates" },
];


const pricing = [
  {
    title: "Basic",
    price: "Rs. 1499/-",
    note: "Stamp duty included",
    features: [
      "ITR filing of 1 year for salaried Individual",
    ],
  },
  {
    title: "Standard",
    price: "Rs. 1999/-",
    note: "Stamp duty included",
    features: [
      "ITR filing of 1 year for non-audit taxpayer​",
    ],
  },
  {
    title: "Professional",
    price: "Rs. 3999/-",
    note: "Stamp duty included",
    features: [
        "ITR filing of 1 year for audit taxpayer up to turnover of 1.5 cr.​",
    ],
  },
];

const incorporationSupportSteps = [
  {
    title: "Data Verification",
    description:
      "One of the person from our team will collect all the data for drafting of lease agreemnt. After reciveing data our expert will verify the same and they will update you time to time for the same.",
  },
  {
    title: "Drafting",
    description:"Once the verification is complete our team will draft the agreement and send it to client for confirmation on agreement.",
  },
  {
    title: "Stamping and Notary",
    description:"After the approval on agreement one of the person from our office will complete the process of stamping and notary.",
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

export default function section8companyincorporationPage() {
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

         <section className="relative bg-white py-16 md:py-24">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent" />
          <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#a63f04]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] lg:items-stretch lg:gap-16">             
              <div
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <div className="space-y-6">
              {requirement.map((feature, idx) => (
                <article
                  key={feature.subtitle}
                  className="group relative overflow-hidden rounded-2xl border border-[#a63f04]/10 bg-white/85 p-6 shadow-[0_22px_80px_rgba(20,22,23,0.08)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/35 hover:bg-white hover:shadow-[0_32px_100px_rgba(166,63,4,0.16)]"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="absolute right-4 top-4 text-6xl font-black leading-none text-[#a63f04]/[0.05] transition duration-500 group-hover:text-[#a63f04]/10">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <h3 className="mb-4 text-base font-black leading-6 tracking-[0.08em] text-[#a63f04]">
                      {feature.subtitle}
                    </h3>

                    <div className="space-y-3">
                      {feature.paragraphs.map((paragraph, pIdx) => (
                    <p key={`${idx}-${pIdx}`} className="md:pl-2">
                      {paragraph}
                    </p>
                  ))}
                    </div>
                  </div>
                </article>
              ))}
                </div>
              </div>
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
                  <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">About Taxes and Itr
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#a63f04] to-[#e65a05]" />                 
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <ul className="space-y-4">
  {individualDocs.map((item, index) => (
    <li
      key={index}
      className="flex items-center gap-4 border-b border-gray-100 pb-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-[#a63f04] shadow-sm">
        <FontAwesomeIcon icon={item.icon} />
      </div>

      <span className="text-gray-700 font-medium">
        {item.text}
      </span>
    </li>
  ))}
</ul> */}
<section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fffaf7] to-white py-20 md:py-24">
  {/* Background */}
  <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent" />
  <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-[#a63f04]/5 blur-3xl" />
  <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />

  <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">

    {/* Heading */}
    <div
      className="mx-auto mb-16 max-w-3xl text-center"
      data-aos="fade-up"
    >
      <span className="rounded-full bg-[#a63f04]/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#a63f04]">
        Document Checklist
      </span>

      <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
        Requirement for
        <span className="block text-[#a63f04]">
          Filing Income Tax Return
        </span>
      </h2>

      <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#a63f04] to-orange-500"></div>
    </div>

    {/* Cards */}
    <div className="grid gap-10 lg:grid-cols-2">

      {/* Individual */}
      <div
        className="group overflow-hidden rounded-3xl border border-[#a63f04]/10 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        data-aos="fade-right"
      >
        <div className="bg-gradient-to-r from-[#a63f04] to-[#d35400] p-6">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl text-white">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                Individual
              </h3>

              <p className="text-sm text-white/80">
                Required Documents
              </p>
            </div>
          </div>

        </div>

        <div className="p-7">

          <ul className="space-y-4">

            {individualDocs.map((item, index) => (

              <li
                key={index}
                className="flex items-center gap-4 border-b border-gray-100 pb-4 transition hover:translate-x-2"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-[#a63f04]">
                  <FontAwesomeIcon icon={item.icon} />
                </div>

                <span className="font-medium text-gray-700">
                  {item.text}
                </span>

              </li>

            ))}

          </ul>

          <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#a63f04] py-4 font-semibold text-white transition hover:bg-[#8b3403]">

            More Info

            <FontAwesomeIcon icon={faArrowRight} />

          </button>

        </div>

      </div>

      {/* Business */}
      <div
        className="group overflow-hidden rounded-3xl border border-[#a63f04]/10 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        data-aos="fade-left"
      >

        <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl text-white">
              <FontAwesomeIcon icon={faBuilding} />
            </div>

            <div>

              <h3 className="text-2xl font-bold text-white">
                Business
              </h3>

              <p className="text-sm text-white/80">
                Required Documents
              </p>

            </div>

          </div>

        </div>

        <div className="p-7">

          <ul className="space-y-4">

            {businessDocs.map((item, index) => (

              <li
                key={index}
                className="flex items-center gap-4 border-b border-gray-100 pb-4 transition hover:translate-x-2"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-[#a63f04]">
                  <FontAwesomeIcon icon={item.icon} />
                </div>

                <span className="font-medium text-gray-700">
                  {item.text}
                </span>

              </li>

            ))}

          </ul>

          <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-semibold text-white transition hover:bg-black">

            More Info

            <FontAwesomeIcon icon={faArrowRight} />

          </button>

        </div>

      </div>

    </div>

    {/* Bottom Badge */}

    <div
      className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-4 rounded-2xl border border-[#a63f04]/10 bg-white px-8 py-5 shadow-xl"
      data-aos="zoom-in"
    >

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a63f04]/10">

        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-2xl text-[#a63f04]"
        />

      </div>

      <p className="text-lg text-gray-700">

        Keep your documents ready.

        <span className="font-bold text-[#a63f04]">
          {" "}
          File with confidence.
        </span>

      </p>

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
