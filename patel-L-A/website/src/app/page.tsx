/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import CategorySlider from "@/components/CategorySlider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TestimonialSlider from "@/components/TestimonialSlider";

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
    title: "Bond ETF's",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, seddo eiusmod tempor incididunt ut laboret dolore magna aliqua sociosqu.",
    variant: "blue",
    aos: "fade-up",
  },
  {
    number: "02",
    kicker: "Automated Invest Account",
    title: "Index Investment",
    description:
      "Ut enim ad minim veniam, quis nostrud ullamco laboris aliquip commodo consequat cillum dolore eu fugiat nulla hendrerit cursus augue.",
    variant: "white",
    aos: "fade-up",
  },
  {
    number: "03",
    kicker: "Cash Account",
    title: "High-Yield Savings",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt mollit anim id est laborum exercitation ullamco laboris.",
    variant: "white",
    aos: "fade-up",
  },
  {
    number: "04",
    kicker: "Stocks Account",
    title: "Bond ETF's",
    description:
      "Curae fusce sapien pulvinar platea posuere interdum lorem iaculis nascetur fusce ad lectus maecenas sit aliquam scelerisque.",
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
    title: "Professionalism",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, seddo eiusmod tempor incididunt ut laboret dolore magna aliqua sociosqu.",
  },
  {
    title: "Transparency",
    description:
      "Pellentesque lectus convallis sociosqu torquent ad ante cursus augue urna est commodo aptent morbi quis ornare pellentesque.",
  },
  {
    title: "Security",
    description:
      "Pellentesque ad inceptos egestas platea tristique sodales pellentesque eget porta venenatis maximus laoreet aptent.",
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
    <div className="min-h-screen overflow-hidden bg-[#050b0d]">
      <Navbar />
      <main className="relative text-white">
        <section className="relative mx-auto grid min-h-[calc(100vh-96px)] container items-center gap-12 px-6 py-14 sm:px-9 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-[64px]">
              Shape The Future Through Strategic Investments!
            </h1>
            <p className="mt-8 max-w-xl text-base font-medium leading-8 text-white sm:text-lg">
              Where innovative and high-potential business opportunities await
              discovery, we are your partners.
            </p>
            <a
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#050b0d] shadow-[0_18px_45px_rgba(255,255,255,0.12)] transition hover:bg-[#d9edf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b0d]"
            >
              Get Started
              <span aria-hidden="true" className="text-xl leading-none">
                &#8599;
              </span>
            </a>
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-[570px] grid-cols-1 gap-5 sm:grid-cols-[0.68fr_1fr] sm:gap-6 lg:mx-0">
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="rounded-[28px] bg-[#d6edf1] p-6 text-[#050b0d] shadow-2xl shadow-black/20 sm:rounded-[30px] sm:p-7">
                <p className="text-xs font-bold uppercase">Average Investment</p>
                <p className="mt-2 text-3xl font-black">$100K</p>
                <div className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#050b0d] px-5 py-3 text-sm font-black text-white">
                  <span aria-hidden="true">&#8599;</span>
                  25%
                </div>
              </div>

              <div className="relative min-h-[245px] overflow-hidden rounded-[28px] bg-[#122326] shadow-2xl shadow-black/25 sm:min-h-[315px] sm:rounded-[30px]">
                <Image
                  src="/images/home-growth-placeholder.svg"
                  alt="Placeholder growth chart visualization"
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative min-h-[405px] overflow-hidden rounded-[28px] bg-[#182225] shadow-2xl shadow-black/30 sm:min-h-[545px] sm:rounded-[30px]">
              <Image
                src="/images/home-investor-placeholder.svg"
                alt="Placeholder investor reviewing finance updates"
                fill
                priority
                sizes="(min-width: 1024px) 330px, 55vw"
                className="object-cover"
              />

              <div className="absolute right-5 top-6 flex items-center gap-3 text-sm font-black">
                <span>How it works</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#050b0d]">
                  <span aria-hidden="true" className="ml-0.5">
                    &#9658;
                  </span>
                </span>
              </div>

              <div className="absolute bottom-6 left-5 right-5 flex max-w-[230px] items-center gap-4 rounded-full bg-[#66574f]/95 px-4 py-3 text-white shadow-2xl shadow-black/30 backdrop-blur">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-[#050b0d]">
                  &#10003;
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black uppercase">
                    Invoice Paid
                  </span>
                  <span className="block text-sm font-bold">$25,000</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-[radial-gradient(circle_at_24%_18%,#fff0e8_0,#fff7f3_32%,#ffffff_64%)] text-[#172033]">
          <section className="container mx-auto grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
            <div className="relative mx-auto min-h-[360px] w-full max-w-[650px] sm:min-h-[430px]">
              <div className="absolute left-0 top-0 h-[310px] w-[58%] overflow-hidden rounded-full shadow-[0_24px_70px_rgba(238,63,0,0.12)] sm:h-[390px]">
                <img
                  src="https://placehold.co/647x342"
                  alt="Business team placeholder"
                  title="Business team placeholder"
                  width="647"
                  height="342"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute right-0 top-8 h-[310px] w-[58%] overflow-hidden rounded-full shadow-[0_24px_70px_rgba(23,32,51,0.12)] sm:h-[390px]">
                <img
                  src="https://placehold.co/647x342"
                  alt="Business meeting placeholder"
                  title="Business meeting placeholder"
                  width="647"
                  height="342"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute left-1/2 top-20 z-10 flex h-36 w-44 -translate-x-1/2 flex-col items-center justify-center rounded-lg bg-[#ee3f00] p-5 text-center text-white shadow-[0_20px_45px_rgba(238,63,0,0.28)] sm:top-24 sm:h-40 sm:w-52">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-lg font-black">
                  80%
                </div>
                <p className="mt-5 text-sm font-black sm:text-base">
                  Business Progress
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-xl lg:mx-0">
              <p className="text-sm font-semibold text-slate-500">
                About Business
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-[#172033] sm:text-5xl">
                Smart and effective business agency.
              </h2>
              <p className="mt-7 text-base leading-8 text-slate-600">
                We believe in the power of collaboration and personalized
                solutions. By understanding our clients&apos; unique needs and
                goals, we tailor our approach to deliver strategic insights,
                creative solutions.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee3f00] text-white">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm text-slate-500">
                      Call us anytime
                    </span>
                    <span className="block text-lg font-black text-[#172033]">
                      +256 56778.5678
                    </span>
                  </span>
                </div>

                <p className="font-serif text-2xl italic text-[#172033]">
                  Jonathon Doe
                </p>
              </div>

              <a
                href="/about"
                className="mt-8 inline-flex rounded-lg bg-[#ee3f00] px-8 py-4 text-sm font-black text-white transition hover:bg-[#c73500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee3f00] focus-visible:ring-offset-2"
              >
                About Us
              </a>
            </div>
          </section>

          <section className="container mx-auto px-6 pb-20 sm:px-9 lg:pb-28">
            <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-[#f4f4f4] shadow-[0_24px_80px_rgba(23,32,51,0.06)] sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-slate-200 px-8 py-10 text-center last:border-b-0 sm:nth-even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"
                >
                  <StatIcon />
                  <p className="mt-7 text-4xl font-black text-[#172033]">
                    {item.value}
                  </p>
                  <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="relative overflow-hidden bg-[#050b0d] px-6 py-20 text-white sm:px-9 lg:py-28">
          <div className="pointer-events-none absolute -left-16 top-28 h-48 w-48 rounded-full border-[52px] border-[#132226]/80" />
          <div className="pointer-events-none absolute -right-24 top-60 h-48 w-48 rounded-full border-[52px] border-[#132226]/80" />

          <div className="container relative z-10 mx-auto">
            <div
              className="mx-auto max-w-4xl text-center"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Choose The Right Level Of Risk For Different Chonks Of You Change
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {riskLevels.map((item, index) => {
                const isBlue = item.variant === "blue";
                const isImage = item.variant === "image";

                return (
                  <article
                    key={`${item.number}-${item.title}`}
                    className={`group relative flex min-h-[430px] overflow-hidden rounded-[28px] p-7 transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_28px_80px_rgba(0,0,0,0.32)] ${
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
                          src="https://placehold.co/647x342"
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

                      <h3 className="mt-12 text-2xl font-black">{item.title}</h3>
                      <p
                        className={`mt-6 text-base leading-8 ${
                          isImage
                            ? "font-semibold text-white"
                            : isBlue
                              ? "text-[#3f5961]"
                              : "text-slate-700"
                        }`}
                      >
                        {item.description}
                      </p>

                      <a
                        href="/contact"
                        className={`mt-auto inline-flex w-fit items-center gap-3 rounded-full px-7 py-4 text-sm font-black transition-all duration-300 group-hover:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                          isBlue
                            ? "bg-[#155dfc] text-white hover:bg-[#0f46c7] focus-visible:ring-[#155dfc] focus-visible:ring-offset-[#d6edf1]"
                            : isImage
                              ? "bg-white text-[#050b0d] hover:bg-[#d6edf1] focus-visible:ring-white focus-visible:ring-offset-[#050b0d]"
                              : "bg-[#050b0d] text-white hover:bg-[#155dfc] focus-visible:ring-[#050b0d] focus-visible:ring-offset-white"
                        }`}
                      >
                        Learn More
                        <span aria-hidden="true" className="text-lg leading-none">
                          &#8599;
                        </span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <CategorySlider />

        <section className="overflow-hidden bg-[linear-gradient(105deg,#ffffff_0%,#ffffff_55%,#fff1eb_100%)] py-20 text-[#172033] sm:py-24 lg:py-28">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div data-aos="fade-right" data-aos-duration="850">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Just A Consultancy
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                We know how to manage business globally
              </h2>
              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
                Porttitor ornare fermentum aliquam pharetra ut facilisis gravida
                risus best suscipit. dui feugiat fusce conubia ridiculus
                tristique parturient gilmpci for forgettn meet natoque vulputate
                risu.
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
                      <span className="block text-xl font-black text-[#172033]">
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
              className="relative mx-auto w-full max-w-[690px] lg:mx-0"
              data-aos="fade-left"
              data-aos-duration="850"
            >
              <div className="relative overflow-hidden rounded-bl-[120px] shadow-[0_28px_80px_rgba(23,32,51,0.12)] sm:rounded-bl-[170px]">
                <img
                  src="https://placehold.co/680x370"
                  alt="Consultancy meeting placeholder"
                  title="Consultancy meeting placeholder"
                  width="680"
                  height="370"
                  className="h-[280px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[370px]"
                />
              </div>

              <div
                className="absolute -top-6 left-6 flex h-32 w-36 flex-col items-center justify-center rounded-lg bg-[#a63f04] text-center text-white shadow-[0_22px_45px_rgba(166,63,4,0.28)] sm:-top-10 sm:left-[-24px] sm:h-40 sm:w-40"
                data-aos="zoom-in"
                data-aos-delay="220"
              >
                <span className="text-4xl font-black sm:text-5xl">25+</span>
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#050b0d] text-white transition duration-300 hover:scale-110 hover:bg-[#a63f04]">
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
                  <h2 className="text-2xl font-black leading-snug sm:text-3xl lg:text-[34px]">
                    To begin investing, simply register on our website and
                    complete the verification process.
                  </h2>
                  <p className="mt-6 text-base leading-8 text-[#4a6269] sm:text-lg">
                    Natoque iaculis cursus augue urna est commodo aptent morbi
                    tortor porttitor quis ornare tortor sed rutrum molestie
                    libero primis.
                  </p>

                  <a
                    href="/contact"
                    className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#050b0d] px-8 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-[#a63f04] hover:shadow-[0_18px_38px_rgba(166,63,4,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d6edf1]"
                  >
                    Start Now
                    <span aria-hidden="true" className="text-lg leading-none">
                      &#8599;
                    </span>
                  </a>
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
                  <p className="mt-6 text-base leading-8 text-slate-700">
                    {feature.description}
                  </p>
                  <a
                    href="/services"
                    className="mt-8 inline-flex items-center gap-3 text-base font-black text-[#050b0d] transition duration-300 group-hover:gap-4 group-hover:text-[#a63f04]"
                  >
                    Learn More
                    <span aria-hidden="true" className="text-xl leading-none">
                      &#8599;
                    </span>
                  </a>
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
