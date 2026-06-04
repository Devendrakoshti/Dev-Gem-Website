import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
    kicker: "Business foundation",
    title: "Registration Services",
    description:
      "We Register Company / LLP/ Partnership Firm as per your Requirement. Registrations of GST, FSSAI, DSC, DIN, MSME, IEC etc.",
  },
  {
    number: "02",
    kicker: "Ongoing governance",
    title: "Compliance Management",
    description:
      "Compliances for Companies, LLPs, Partnerships & Sole Proprietors etc. Drafting of Your documents, contracts, and registrations.",
  },
  {
    number: "03",
    kicker: "Tax clarity",
    title: "Tax Preparation",
    description:
      "GST & Income Tax Services For Individuals, LLP & Companies Etc.",
  },
  {
    number: "04",
    kicker: "Financial records",
    title: "Accounting and Bookkeeping",
    description: "Accounting & Book keeping services on Monthly/ annual basis.",
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
      "We stay ahead of industry trends by incorporating the latest technologies and modern construction techniques. it's sustainable building practices.",
    icon: "innovation",
  },
];

const testimonials = [
  {
    title: "Great Business Solution",
    quote:
      "Dabus nisl aliquet congue tellus nascetur lectus sapien mattis arcu dictums augue volutpat felis etiam suspendisse.",
    name: "William Henry",
    role: "Finance Catalyst Agency",
  },
  {
    title: "Smart Enterprise Solution",
    quote:
      "I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood.",
    name: "Julian Wyat",
    role: "Marketer Manager",
  },
  {
    title: "Advanced Business Services",
    quote:
      "Working with as our IT Specialist has been a game-changer. Their deep technical knowledge, quick problem-solving skills, and proactive.",
    name: "Beckett Hayden",
    role: "It Specialist Worker",
  },
];

const clientLogos = [
  "Startup India",
  "GST Advisory",
  "MSME Desk",
  "FSSAI Support",
  "DSC Partner",
  "Tax Desk",
];

function ServiceIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 9h10M7 13h6M9 21h6" strokeLinecap="round" />
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h4" />
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path
        d="m20 6-11 11-5-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChooseUsIcon({ type }: { type: string }) {
  if (type === "customer") {
    return (
      <svg
        aria-hidden="true"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4" />
        <path
          d="M24 8V3M24 45v-5M8 24H3M45 24h-5M12.7 12.7 9.2 9.2M38.8 38.8l-3.5-3.5M35.3 12.7l3.5-3.5M9.2 38.8l3.5-3.5"
          strokeLinecap="round"
        />
        <path d="M16 36c2-4 5-6 8-6s6 2 8 6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "innovation") {
    return (
      <svg
        aria-hidden="true"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M18 34h12M19 39h10M20 43h8" strokeLinecap="round" />
        <path d="M33 22c0 4-2 7-5 9h-8c-3-2-5-5-5-9a9 9 0 1 1 18 0Z" />
        <path
          d="M24 7V3M10 12 7 9M38 12l3-3M8 24H4M44 24h-4M18 22l4 4 8-10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 48 48"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M15 37c2-6 6-9 12-9s10 3 12 9" strokeLinecap="round" />
      <circle cx="27" cy="18" r="7" />
      <path
        d="M10 21h8M14 17v8M35 8l1.4 2.9 3.1.4-2.2 2.2.5 3.1L35 15.1l-2.8 1.5.5-3.1-2.2-2.2 3.1-.4L35 8ZM14 7l.9 1.9 2.1.3-1.5 1.4.4 2L14 12.6l-1.9 1 .4-2L11 10.2l2.1-.3L14 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main className="main">
        <div className="section-gradient-bg section-mb h-full w-full py-15 md:py-20 lg:py-30">
          <section className="container mx-auto grid grid-cols-1 items-center gap-8 md:gap-20 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="banner-title leading-tight">
                Complete Legal, <span>Compliance & Registration</span> Services
                for Businesses in India
              </h1>
              <p className="mb-10 mt-8 max-w-xl text-2xl font-medium leading-8">
                Expert legal, compliance, and registration services designed to
                help startups and businesses launch, operate, and grow with
                confidence.
              </p>
              <Link
                href="/contact-us"
                aria-current="page"
                className="btn-custom btn-primary"
              >
                Request a Quote <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-[0.68fr_1fr] sm:gap-6 lg:mx-0">
                <div className="flex flex-col gap-5 sm:gap-6">
                  <div className="rounded-[28px] bg-white p-6 text-[#050b0d] shadow-2xl shadow-black/20 sm:rounded-[30px] sm:p-7">
                    <div className="mb-4 flex items-center">
                      <svg
                        width="45px"
                        height="45px"
                        viewBox="-3 0 262 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                      >
                        <path
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          fill="#4285F4"
                        />
                        <path
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          fill="#34A853"
                        />
                        <path
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          fill="#FBBC05"
                        />
                        <path
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          fill="#EB4335"
                        />
                      </svg>
                    </div>
                    <p className="text-1xl font-black uppercase">Google Rank</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-yellow-400">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} className="text-zinc-300" />
                    </div>
                  </div>

                  <div className="relative min-h-[245px] overflow-hidden rounded-[28px] bg-[#122326] shadow-2xl shadow-black/25 sm:min-h-[315px] sm:rounded-[30px]">
                    <Image
                      src="/images/home-hero-image-1.webp"
                      alt="Home hero image of a business person analyzing financial data on a laptop"
                      fill
                      sizes="(min-width: 1024px) 220px, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="relative min-h-[405px] overflow-hidden rounded-[28px] bg-[#182225] shadow-2xl shadow-black/30 sm:min-h-[545px] sm:rounded-[30px]">
                  <Image
                    src="/images/home-hero-image-2.webp"
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

        <section className="relative overflow-hidden bg-[#fbfaf8] py-16 text-[#141617] sm:py-20 lg:py-28">
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(#141617_1px,transparent_1px),linear-gradient(90deg,#141617_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#a63f04]/10 blur-3xl" />
          <div className="container relative z-10 mx-auto">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div data-aos="fade-up" data-aos-duration="850">
                <span className="mb-5 inline-flex items-center gap-3 rounded-lg border border-[#a63f04]/20 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[#a63f04] shadow-sm">
                  About Business
                </span>
                <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  About Patel Legal Advisors
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#515455] sm:text-lg">
                  Patel Legal Advisors is a fastest growing organization which
                  provides solution of your any business related queries. We here
                  provides all type of Business Registration assistance. Patel
                  Legal Advisors was registered in 2022 with a mission to
                  provide best professional services. We have a professional Team
                  players having 5+ years experience in our team as our Team is
                  built with professional Chartered Accountants, Company
                  Secretaries and Lawyers. We provide our Services Pan India.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Chartered Accountants", "Company Secretaries", "Lawyers"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_18px_55px_rgba(20,22,23,0.06)] transition duration-500 hover:-translate-y-1 hover:border-[#a63f04]/25"
                      >
                        <div className="flex items-center gap-3 text-sm font-black text-[#141617]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#a63f04] text-white">
                            <TrustIcon />
                          </span>
                          {item}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div
                className="grid gap-4 sm:grid-cols-2"
                data-aos="fade-left"
                data-aos-duration="850"
              >
                <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-[0_26px_80px_rgba(20,22,23,0.18)] sm:row-span-2">
                  <Image
                    src="/images/home-about-us-01.webp"
                    alt="Patel Legal Advisors consultation support"
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141617]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/15 bg-white/15 p-4 text-white backdrop-blur-md">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-white/75">
                      Pan India
                    </p>
                    <p className="mt-2 text-2xl font-black">Legal Support</p>
                  </div>
                </div>

                <div className="rounded-lg bg-[#141617] p-6 text-white shadow-[0_26px_80px_rgba(20,22,23,0.18)]">
                  <p className="text-sm font-bold text-[#d29f81]">Registered</p>
                  <p className="mt-4 text-5xl font-black">2022</p>
                  <p className="mt-4 text-sm leading-6 text-white/70">
                    Built with a mission to provide best professional services.
                  </p>
                </div>

                <div className="rounded-lg border border-[#a63f04]/15 bg-white p-6 shadow-[0_20px_70px_rgba(166,63,4,0.10)]">
                  <p className="text-sm font-bold text-[#a63f04]">
                    Team Experience
                  </p>
                  <p className="mt-4 text-5xl font-black">5+</p>
                  <p className="mt-4 text-sm leading-6 text-[#515455]">
                    Years of practical guidance for business queries.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-black/5 bg-white/85 p-5 shadow-[0_16px_55px_rgba(20,22,23,0.06)] backdrop-blur"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <p className="text-3xl font-black text-[#a63f04]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#515455]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto">
            <div
              className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div>
                <span className="sub-title">Services</span>
                <h2 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  Our Main Services
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-[#515455]">
                Legal, compliance, tax, accounting, and documentation support
                arranged into clear service pathways for startups and growing
                businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {riskLevels.map((item, index) => (
                <article
                  key={`${item.number}-${item.title}`}
                  className="group relative flex min-h-[330px] overflow-hidden rounded-lg border border-black/5 bg-[#fbfaf8] p-7 shadow-[0_20px_70px_rgba(20,22,23,0.06)] transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/35 hover:bg-white hover:shadow-[0_32px_95px_rgba(166,63,4,0.15)]"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <div className="absolute right-4 top-4 text-7xl font-black leading-none text-[#a63f04]/[0.06] transition duration-500 group-hover:text-[#a63f04]/10">
                    {item.number}
                  </div>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#141617] text-white transition duration-500 group-hover:bg-[#a63f04]">
                      <ServiceIcon />
                    </div>
                    <p className="mt-8 text-xs font-black uppercase tracking-[0.16em] text-[#a63f04]">
                      {item.kicker}
                    </p>
                    <h3 className="mt-3 text-xl font-black">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#515455]">
                      {item.description}
                    </p>
                    <Link
                      href="/contact-us"
                      aria-current="page"
                      className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-[#a63f04] transition duration-300 group-hover:translate-x-1"
                    >
                      Know More <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f8f3ee] py-16 text-[#141617] sm:py-20 lg:py-28">
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_20%_20%,#a63f04_0_1px,transparent_1px),radial-gradient(circle_at_80%_40%,#141617_0_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#a63f04]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#d29f81]/20 blur-3xl" />
          <div className="container relative z-10 mx-auto">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div data-aos="fade-right" data-aos-duration="850">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a63f04]">
                  Patel Legal Advisors The Best Choice!
                </p>
                <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-[#141617] sm:text-4xl lg:text-5xl">
                  A sharper advisory system for businesses that need confidence
                  before they scale.
                </h2>
              </div>
              <div
                className="rounded-lg border border-[#a63f04]/15 bg-white/80 p-6 shadow-[0_30px_100px_rgba(166,63,4,0.12)] backdrop-blur sm:p-8"
                data-aos="fade-left"
                data-aos-duration="850"
              >
                <p className="text-base leading-8 text-[#515455]">
                  Patel Legal Advisors is a fastest growing organization which
                  provides solution of your any business related queries. We here
                  provides all type of Business Registration assistance. Patel
                  Legal Advisors was registered in 2022 with a mission to
                  provide best professional services. We have a professional Team
                  players having 5+ years experience in our team as our Team is
                  built with professional Chartered Accountants, Company
                  Secretaries and Lawyers. We provide our Services Pan India.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {trustFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group rounded-lg border border-[#a63f04]/10 bg-white/85 p-6 shadow-[0_20px_70px_rgba(20,22,23,0.06)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/35 hover:bg-white hover:shadow-[0_30px_90px_rgba(166,63,4,0.14)]"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-[#a63f04] text-white">
                    <TrustIcon />
                  </div>
                  <h3 className="text-xl font-black text-[#141617]">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#515455]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#fdfbf8] py-16 text-[#141617] sm:py-20 lg:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a63f04]/25 to-transparent" />
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#a63f04]/10 blur-3xl" />
          <div className="absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-[#d29f81]/20 blur-3xl" />

          <div className="container relative z-10 mx-auto">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
              <div
                className="flex flex-col justify-between rounded-lg border border-[#a63f04]/15 bg-[#141617] p-7 text-white shadow-[0_32px_100px_rgba(20,22,23,0.22)] sm:p-9 lg:p-10"
                data-aos="fade-right"
                data-aos-duration="850"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d29f81]">
                    Why Do You Choose Us?
                  </p>
                  <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    Built for founders who want reliable execution, not legal
                    confusion.
                  </h2>
                  <p className="mt-6 text-base leading-8 text-white/70">
                    Every business decision gets a clearer route: expert
                    guidance, close coordination, and modern execution from
                    consultation to completion.
                  </p>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    ["01", "Expert led"],
                    ["02", "Client first"],
                    ["03", "Future ready"],
                  ].map(([number, label]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                    >
                      <p className="text-2xl font-black text-[#d29f81]">
                        {number}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white/75">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact-us"
                  className="mt-10 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[#141617] transition duration-300 hover:bg-[#a63f04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29f81] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141617]"
                >
                  Book Appointment <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>

              <div className="grid gap-5">
                {chooseUsFeatures.map((feature, index) => (
                  <article
                    key={feature.title}
                    className={`group relative overflow-hidden rounded-lg border border-black/5 bg-white p-6 shadow-[0_20px_70px_rgba(20,22,23,0.07)] transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/30 hover:shadow-[0_34px_100px_rgba(166,63,4,0.16)] sm:p-7 ${
                      index % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 140}
                  >
                    <div className="absolute right-5 top-5 text-7xl font-black leading-none text-[#a63f04]/[0.05] transition duration-500 group-hover:text-[#a63f04]/10">
                      0{index + 1}
                    </div>
                    <div className="relative z-10 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f5e8df] text-[#a63f04] transition duration-500 group-hover:bg-[#a63f04] group-hover:text-white group-hover:shadow-[0_16px_36px_rgba(166,63,4,0.22)]">
                        <ChooseUsIcon type={feature.icon} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a63f04]">
                          Decision Advantage
                        </p>
                        <h3 className="mt-3 text-2xl font-black">
                          {feature.title}
                        </h3>
                        <p className="mt-4 text-base leading-8 text-[#515455]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div data-aos="fade-right" data-aos-duration="850">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#a63f04]">
                  Our testimonial
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  2356+ Customer Feedback&apos;s
                </h2>
                <p className="mt-5 text-base leading-8 text-[#515455]">
                  Feedback from clients who trust Patel Legal Advisors for
                  business services, clear guidance, and professional execution.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {testimonials.map((item, index) => (
                  <article
                    key={`${item.name}-${item.title}`}
                    className="rounded-lg border border-black/5 bg-[#fbfaf8] p-6 shadow-[0_20px_70px_rgba(20,22,23,0.06)] transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_32px_95px_rgba(166,63,4,0.14)]"
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                  >
                    <div className="flex gap-1 text-[#a63f04]" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <FontAwesomeIcon key={starIndex} icon={faStar} />
                      ))}
                    </div>
                    <h3 className="mt-6 text-xl font-black">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#515455]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-6 border-t border-black/10 pt-5">
                      <p className="font-black">{item.name}</p>
                      <p className="mt-1 text-sm font-bold text-[#a63f04]">
                        {item.role}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div
              className="mt-16 overflow-hidden rounded-lg border border-black/5 bg-[#141617] py-6 shadow-[0_24px_80px_rgba(20,22,23,0.16)]"
              data-aos="fade-up"
              data-aos-duration="850"
            >
              <div className="flex w-max animate-[legalMarquee_24s_linear_infinite] gap-4 whitespace-nowrap hover:[animation-play-state:paused]">
                {[...clientLogos, ...clientLogos].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="mx-1 inline-flex min-w-44 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-black text-white/80 backdrop-blur transition duration-300 hover:border-[#d29f81]/50 hover:text-white"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <style>{`
        @keyframes legalMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
