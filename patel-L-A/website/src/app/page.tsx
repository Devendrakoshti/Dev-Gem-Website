/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import CategorySlider from "@/components/CategorySlider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TestimonialSlider from "@/components/TestimonialSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const stats = [
  { value: "858+", label: "Successful Projects" },
  { value: "560+", label: "Media Activities" },
  { value: "567+", label: "Skilled Experts" },
  { value: "28k+", label: "Happy Clients" },
];

const riskLevels = [
  {
    number: "01",
    kicker: "Automated Bond Portfolio",
    title: "REGISTRATION SERVICES",
    description:
      "We Register Company / LLP/ Partnership Firm as per your Requirement. Registrations of GST, FSSAI, DSC, DIN, MSME, IEC etc.",
    variant: "white",
    aos: "fade-up",
  },
  {
    number: "02",
    kicker: "Automated Invest Account",
    title: "COMPLIANCE MANAGEMENT",
    description:
      "Compliances for Companies, LLPs, Partnerships & Sole Proprietors etc. Drafting of Your documents, contracts, and registrations.",
    variant: "white",
    aos: "fade-up",
  },
  {
    number: "03",
    kicker: "Cash Account",
    title: "TAX PREPARATION",
    description:
      "GST & Income Tax Services For Individuals, LLP & Companies Etc.",
    variant: "white",
    aos: "fade-up",
  },
  {
    number: "04",
    kicker: "Stocks Account",
    title: "ACCOUNTING AND BOOKKEEPING",
    description:
      "Accounting & Book keeping services on Monthly/ annual basis.",
    variant: "image",
    aos: "fade-up",
  },
];

const consultancyFeatures = [
  {
    title: "Always On Time",
    description: "Fusce condimentum mattis placerat odio donec lacus porta torquent,",
    icon: "clock",
  },
  {
    title: "24/7 Customer Support",
    description: "Fusce condimentum mattis placerat odio donec lacus porta torquent.",
    icon: "support",
  },
];

const trustFeatures = [
  {
    title: "OUR VISION",
    description:
      "To be a world class organization and a catalyst for Expertise, commitment, and value.We will maintain a high-level of ethics, team work and professionalism",
  },
  {
    title: "OUR MISSION",
    description:
      "To provide consistently fastest and easiest services to our clients and helps them growing their business hassle free. It's our mission to consistently Provide Assistance to Clients for Acheiving Business Heights.",
  },
  {
    title: "OUR VALUES",
    description:
      "Our professional Team members of CA, CS & Lawyers provides you best guidance regarding your business queries and assist you to achieve your goals",
  },
];

const chooseUsFeatures = [
  {
    title: "Expertise and Experience",
    description:
      "With years of industry experience, our team of skilled professionals brings in-depth knowledge to every project, ensuring precision.",
    icon: "experience",
  },
  {
    title: "Customer-Centered Approach",
    description:
      "Your satisfaction is our top priority. From the initial consultation to project completion, we work closely with you",
    icon: "customer",
  },
  {
    title: "Innovative Solutions",
    description:
      "We stay ahead of industry trends by incorporating the latest technologies and modern construction techniques. it’s sustainable building practices.",
    icon: "innovation",
  },
];

function StatIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mx-auto h-9 w-9 text-[#ee3f00]"
      fill="none"
      viewBox="0 0 48 48"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M10 34V16h9v18M21 34V10h9v24M32 34V22h6v12" />
      <path d="M7 38h34M11 13l8-5 10 6 9-8M34 6h4v4" />
      <circle cx="15" cy="22" r="2.5" />
      <circle cx="25" cy="18" r="2.5" />
      <circle cx="35" cy="28" r="2.5" />
    </svg>
  );
}

function ConsultancyIcon({ type }: { type: string }) {
  if (type === "support") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 12v-1a7 7 0 0 1 14 0v1" />
        <path d="M5 12H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5ZM19 12h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5Z" />
        <path d="M8 19c1 2 2.5 3 4 3s3-1 4-3M12 15v7M9 22h6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2M3 12h2M19 12h2M12 3v2M12 19v2" strokeLinecap="round" />
    </svg>
  );
}

function ChooseUsIcon({ type }: { type: string }) {
  if (type === "customer") {
    return (
      <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.8">
        <circle cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4" />
        <path d="M24 8V3M24 45v-5M8 24H3M45 24h-5M12.7 12.7 9.2 9.2M38.8 38.8l-3.5-3.5M35.3 12.7l3.5-3.5M9.2 38.8l3.5-3.5" strokeLinecap="round" />
        <path d="M16 36c2-4 5-6 8-6s6 2 8 6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "innovation") {
    return (
      <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 34h12M19 39h10M20 43h8" strokeLinecap="round" />
        <path d="M33 22c0 4-2 7-5 9h-8c-3-2-5-5-5-9a9 9 0 1 1 18 0Z" />
        <path d="M24 7V3M10 12 7 9M38 12l3-3M8 24H4M44 24h-4M18 22l4 4 8-10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 37c2-6 6-9 12-9s10 3 12 9" strokeLinecap="round" />
      <circle cx="27" cy="18" r="7" />
      <path d="M10 21h8M14 17v8M35 8l1.4 2.9 3.1.4-2.2 2.2.5 3.1L35 15.1l-2.8 1.5.5-3.1-2.2-2.2 3.1-.4L35 8ZM14 7l.9 1.9 2.1.3-1.5 1.4.4 2L14 12.6l-1.9 1 .4-2L11 10.2l2.1-.3L14 7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main className="main">
        <div className="bg-[url(/images/section-bg.webp)] bg-cover bg-center h-full w-full py-15 md:py-20 lg:py-30 section-mb">
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="lg:col-span-7 text-white">
            <h1 className="leading-tight banner-title">
              Complete Legal, Compliance & Registration Services for Businesses in India
            </h1>
            <p className="mt-8 max-w-xl text-base font-medium leading-8 sm:text-lg">
              Expert legal, compliance, and registration services designed to help startups and businesses launch, operate, and grow with confidence.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-[0.68fr_1fr] sm:gap-6 lg:mx-0">
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="rounded-[28px] bg-[#d6edf1] p-6 text-[#050b0d] shadow-2xl shadow-black/20 sm:rounded-[30px] sm:p-7">
              <div className="flex items-center mb-4">
                  <svg width="45px" height="45px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
              </div>
                <p className="text-1xl font-black uppercase">Google Rank</p>
                <div className="mt-2 flex items-center gap-1 text-sm text-yellow-400">
                  <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} className="text-zinc-300" />
                </div>
              </div>

              <div className="relative min-h-[245px] overflow-hidden rounded-[28px] bg-[#122326] shadow-2xl shadow-black/25 sm:min-h-[315px] sm:rounded-[30px]">
                <Image src="/images/home-hero-image-1.webp" 
                  alt="Home hero image of a business person analyzing financial data on a laptop"
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative min-h-[405px] overflow-hidden rounded-[28px] bg-[#182225] shadow-2xl shadow-black/30 sm:min-h-[545px] sm:rounded-[30px]">
              <Image
                src="/images/home-hero-image-2.Webp"
                alt="Home hero image of an investor reviewing finance updates"
                fill
                priority
                sizes="(min-width: 1024px) 330px, 55vw"
                className="object-cover"
              />
            </div>
          </div>
          </div>
        </section>
        </div>
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-center section-mb">
          <div className="lg:col-span-7">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center relative">
              <div className="lg:col-span-6 rounded-[200px] overflow-hidden">
                <img
                  src="/images/home-about-us-01.webp"
                  alt="Home about us image of a business person analyzing financial data on a laptop"
                  title="Home about us image of a business person analyzing financial data on a laptop"
                  width="582"
                  height="759"
                  className="h-full w-full object-cover"
                />
                </div>
              <div className="lg:col-span-6 rounded-[200px] overflow-hidden">
                <img
                  src="/images/home-about-us-02.webp"
                  alt="Home about us image of a business person analyzing financial data on a laptop"
                  title="Home about us image of a business person analyzing financial data on a laptop"
                  width="582"
                  height="759"
                  className="h-full w-full object-cover"
                />
                </div>
                 <div className="absolute left-1/2 top-20 z-10 flex h-36 w-44 -translate-x-1/2 flex-col items-center justify-center rounded-lg bg-light-primary p-5 text-center text-white shadow-[0_20px_45px_rgba(238,63,0,0.28)] sm:top-24 sm:h-40 sm:w-52">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-lg font-black">
                  80%
                </div>
                <p className="mt-5 text-sm font-black sm:text-base">
                  Business Progress
                </p>
              </div>
           
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="block" data-aos="fade-left" data-aos-duration="850">
              <span className="sub-title">About Business</span>
              <h2>ABOUT PATEL LEGAL ADVISORS</h2>
              <p>PATEL LEGAL ADVISORS is a fastest growing organization which provides solution of your any business related queries. We here provides all type of Business Registration assistance. PATEL LEGAL ADVISORS was registered in 2022 with a mission to provide best professional services. We have a professional Team players having 5+ years experience in our team as our Team is built with professional Chartered Accountants, Company Secretaries and Lawyers. We provide our Services Pan India.</p>
            </div>
          </div>
        </section>      

        <section className="bg-[url(/images/section-bg.webp)] bg-cover bg-center h-full w-full py-15 md:py-20 lg:py-30">
          <div className="container mx-auto">
            <div className="mb-10" data-aos="fade-up" data-aos-duration="900" >
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">OUR MAIN SERVICES</h2>
            </div>
          <div className="block">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              {riskLevels.map((item, index) => {
                const isBlue = item.variant === "blue";
                const isImage = item.variant === "image";

                return (
                  <article
                    key={`${item.number}-${item.title}`}
                    className={`md:col-span-6 lg:col-span-3 group relative flex h-full overflow-hidden rounded-[28px] p-7 transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_28px_80px_rgba(0,0,0,0.32)] ${
                      isBlue
                        ? "bg-[#d6edf1] text-[#10202a]"
                        : isImage
                          ? "bg-[#151919] text-white"
                          : "bg-white text-[#050b0d]"
                    }`}
                    data-aos={item.aos}
                    data-aos-delay={index * 120}
                  >
                    {isImage ? (
                      <>
                        <img
                          src="/images/home-service-img.webp"
                          alt="Stocks account placeholder"
                          title="Stocks account placeholder"
                          width="647"
                          height="342"
                          className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#111]/80 to-[#191919]" />
                      </>
                    ) : null}

                    <div className="relative z-10 flex h-full w-full flex-col">
                      <p
                        className={`text-sm font-semibold ${
                          isImage ? "text-white" : "text-[#21333a]"
                        }`}
                      >
                        {item.number} - {item.kicker}
                      </p>

                      <h3 className="mt-12 font-black text-lg">{item.title}</h3>
                      <p
                        className={`mt-6 text-base ${
                          isImage
                            ? "font-semibold text-white"
                            : isBlue
                              ? "text-[#3f5961]"
                              : "text-slate-700"
                        }`}
                      >
                        {item.description}
                      </p>

                      <Link
              href="/contact-us"
              aria-current="page"
              className="btn-custom btn-primary mt-10 inline-flex items-center gap-3 self-start rounded-full px-8 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-[#a63f04] hover:shadow-[0_18px_38px_rgba(166,63,4,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d6edf1]">
              Know More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          </div>
        </section>

        <CategorySlider />

        <section className="overflow-hidden bg-[linear-gradient(105deg,#ffffff_0%,#ffffff_55%,#fff1eb_100%)] py-20 text-[#172033] sm:py-24 lg:py-28">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div data-aos="fade-right" data-aos-duration="850">
              <span class="sub-title">About Business</span>
              <h2 className="mt-4">PATEL LEGAL ADVISORS THE BEST CHOICE!</h2>
              <p className="mt-8">
                PATEL LEGAL ADVISORS is a fastest growing organization which provides solution of your any business related queries. We here provides all type of Business Registration assistance. PATEL LEGAL ADVISORS was registered in 2022 with a mission to provide best professional services. We have a professional Team players having 5+ years experience in our team as our Team is built with professional Chartered Accountants, Company Secretaries and Lawyers. We provide our Services Pan India.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {consultancyFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group flex gap-5"
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#1c252c] text-white transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#a63f04] group-hover:shadow-[0_14px_28px_rgba(166,63,4,0.24)]">
                      <ConsultancyIcon type={feature.icon} />
                    </span>
                    <span>
                      <span className="block font-black text-[#172033]">
                        {feature.title}
                      </span>
                      <span className="mt-3 block text-sm leading-7 text-slate-600">
                        {feature.description}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mx-auto w-full max-w-[690px] lg:mx-0"
              data-aos="fade-left"
              data-aos-duration="850"
            >
              <div className="relative overflow-hidden rounded-bl-[120px] shadow-[0_28px_80px_rgba(23,32,51,0.12)] sm:rounded-bl-[170px]">
                <img
                  src="/images/home-why-choose-us.webp"
                  alt="Consultancy meeting placeholder"
                  title="Consultancy meeting placeholder"
                  width="1349"
                  height="872"
                  className="h-[280px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[370px]"
                />
              </div>

              <div
                className="absolute -top-6 left-6 flex h-32 w-36 flex-col items-center justify-center rounded-lg bg-[#a63f04] text-center text-white shadow-[0_22px_45px_rgba(166,63,4,0.28)] sm:-top-10 sm:left-[-24px] sm:h-40 sm:w-40"
                data-aos="zoom-in"
                data-aos-delay="220"
              >
                <span className="text-4xl font-black sm:text-5xl">05+</span>
                <span className="mt-3 text-xs font-black sm:text-sm">
                  Year of experience
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f7f8] py-20 text-[#050b0d] sm:py-24 lg:py-28">
          <div className="container mx-auto max-w-7xl px-6 sm:px-9">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_0.72fr_1.48fr]">
              <div
                className="overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(5,11,13,0.12)]"
                data-aos="fade-up"
              >
                <img
                  src="https://placehold.co/420x520"
                  alt="Workspace placeholder"
                  title="Workspace placeholder"
                  width="420"
                  height="520"
                  className="h-[360px] w-full object-cover transition duration-700 hover:scale-105 md:h-[450px] lg:h-full"
                />
              </div>

              <div
                className="overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(5,11,13,0.12)]"
                data-aos="fade-up"
                data-aos-delay="120"
              >
                <img
                  src="https://placehold.co/420x520"
                  alt="Investment dashboard placeholder"
                  title="Investment dashboard placeholder"
                  width="420"
                  height="520"
                  className="h-[360px] w-full object-cover transition duration-700 hover:scale-105 md:h-[450px] lg:h-full"
                />
              </div>

              <div
                className="flex min-h-[360px] flex-col justify-between rounded-[28px] bg-[#d6edf1] p-8 shadow-[0_24px_70px_rgba(5,11,13,0.08)] sm:p-10 lg:min-h-[450px]"
                data-aos="fade-left"
                data-aos-delay="220"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#050b0d] text-white transition duration-300 hover:scale-110 hover:bg-[#a63f04] mb-5">
                  <svg
                    aria-hidden="true"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m7 17 10-10M10 7h7v7" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4 14 4-4 3 3 5-5" />
                  </svg>
                </div>

                <div className="max-w-2xl">
                  <h2>
                    PATEL LEGAL ADVISORS THE BEST CHOICE!
                  </h2>
                  <p className="mt-6">
                    PATEL LEGAL ADVISORS is a fastest growing organization which provides solution of your any business related queries. We here provides all type of Business Registration assistance. PATEL LEGAL ADVISORS was registered in 2022 with a mission to provide best professional services. We have a professional Team players having 5+ years experience in our team as our Team is built with professional Chartered Accountants, Company Secretaries and Lawyers. We provide our Services Pan India.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 grid gap-10 md:grid-cols-3 lg:mt-24 lg:gap-16">
              {trustFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <h3 className="text-2xl font-black">{feature.title}</h3>
                  <p className="mt-6">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eeeae6] py-20 text-[#050b0d] sm:py-24 lg:py-28">
          <div className="container mx-auto max-w-7xl px-6 sm:px-9">
            <div
              className="mx-auto max-w-3xl text-center"
              data-aos="fade-up"
              data-aos-duration="850"
            >
              <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                Why Do You Choose Us?
              </h2>
              <p className="mt-7 text-base leading-8 text-slate-600">
                Quis nulla blandit vulputate morbi adipiscing sem vestibulum.
                Nulla turpis integer dui sed posuere sem. Id molestie mi arcu
                gravida lorem potenti.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {chooseUsFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group rounded-lg bg-white p-8 shadow-[0_18px_60px_rgba(23,32,51,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(166,63,4,0.14)] sm:p-10 lg:p-12"
                  data-aos="fade-up"
                  data-aos-delay={index * 140}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eeeae6] text-[#ff4a1c] transition duration-300 group-hover:bg-[#a63f04] group-hover:text-white group-hover:shadow-[0_16px_34px_rgba(166,63,4,0.24)]">
                    <ChooseUsIcon type={feature.icon} />
                  </div>

                  <h3 className="mt-10 text-2xl font-black">{feature.title}</h3>
                  <p className="mt-6 text-base leading-8 text-slate-600">
                    {feature.description}
                  </p>

                  <a
                    href="/contact"
                    className="mt-9 inline-flex rounded-md bg-[#f3f1ef] px-8 py-4 text-base font-black text-[#ff4a1c] transition duration-300 hover:bg-[#a63f04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2"
                  >
                    Book Appointment
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSlider />
        <Footer />
      </main>
    </div>
  );
}
