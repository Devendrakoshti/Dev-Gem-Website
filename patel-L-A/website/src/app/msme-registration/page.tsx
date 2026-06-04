import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const heroStats = [
  { value: "2020", label: "New MSME criteria effective" },
  { value: "Rs. 1799/-", label: "Starting package" },
  { value: "Pan India", label: "Registration support" },
];

const documentGroups = [
  {
    title: "In Case of Proprietorship",
    items: [
      "PAN card of company",
      "Aadhaar card owner",
      "Business address proof",
      "Bank statement",
      "GSTIN if have",
      "Details of major business activities",
    ],
  },
  {
    title: "In Case of Partnership Firm / LLP",
    items: [
      "PAN card of LLP",
      "Aadhaar card of any one partner",
      "Business address proof",
      "Bank statement",
      "GSTIN if have",
      "Certificate of LLP incorporation",
      "Details of major business activities",
    ],
  },
  {
    title: "In Case of Company",
    items: [
      "PAN card of company",
      "Aadhaar card of any one director",
      "Business address proof",
      "Bank statement",
      "GSTIN if have",
      "Certificate of company incorporation",
      "Details of major business activities",
    ],
  },
];

const pricingPlans = [
  {
    title: "MSME Application",
    price: "Starter",
    features: ["MSME application support", "Document checklist", "Basic guidance"],
  },
  {
    title: "MSME Application Same Day",
    price: "Priority",
    features: ["Same day application", "Expert review", "Faster processing support"],
  },
  {
    title: "MSME Application Same Day + Trademark",
    price: "Growth",
    features: [
      "MSME application same day",
      "Trademark application for any one class",
      "Startup-ready documentation support",
    ],
  },
];

const processSteps = [
  {
    step: "Step-1",
    title: "Documents Verification",
    description:
      "One of the person from our team will collect all the information and documents for MSME Registration.",
  },
  {
    step: "Step-2",
    title: "Application for MSME",
    description:
      "After receiving documents our expert will verify the same and apply for MSME Registration.",
  },
  {
    step: "Step-3",
    title: "Status Update",
    description:
      "We update you time to time for the same and keep the process clear.",
  },
  {
    step: "Step-4",
    title: "Filing",
    description:
      "Once the verification is complete our team will apply for MSME Registration.",
  },
  {
    step: "Step-5",
    title: "Certification",
    description:
      "After filing of application it will take up to 1-2 hours for approval. Once Certificate of MSME Registration is received team will update the same.",
  },
];

const whyUs = [
  {
    title: "We Make Your Dream Come True",
    description:
      "We are a team of experienced professionals who will complete your project successfully.",
  },
  {
    title: "Best Price for Excellent Work",
    description: "Reasonable price and best service.",
  },
  {
    title: "We Hear You",
    description: "We always anticipate what you expect.",
  },
  {
    title: "Mon-Sat Support",
    description: "We're always online on office time.",
  },
];

const reviews = [
  {
    name: "Shree Nivas",
    quote:
      "PATEL LEGAL ADVISORS Team helped me to manage my compliances and filing on time. I'm really impressed with their services.",
  },
  {
    name: "Jai Shree",
    quote:
      "Package suggested to us is very affordable. Plus point, I would definitely recommend their service.",
  },
  {
    name: "Anand",
    quote:
      "PATEL LEGAL ADVISORS provides phenomenal service and support to us. They have excellent team of employees.",
  },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m20 6-11 11-5-5" />
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
      strokeWidth="2.2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#a63f04]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#141617] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[#515455]">{description}</p>
      ) : null}
    </div>
  );
}

export default function MSMERegistrationPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fdfbf8]">
      <Navbar />
      <main className="main">
        <section className="relative overflow-hidden bg-[#f8f3ee] py-16 text-[#141617] sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#141617_1px,transparent_1px),linear-gradient(90deg,#141617_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#a63f04]/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#d29f81]/25 blur-3xl" />

          <div className="container relative z-10 mx-auto">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div data-aos="fade-right" data-aos-duration="850">
                <p className="mb-5 inline-flex rounded-lg border border-[#a63f04]/20 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#a63f04] shadow-sm">
                  MSME Registration
                </p>
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#141617] sm:text-5xl lg:text-6xl">
                  MSME Registration for growing Indian businesses.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#515455] sm:text-lg">
                  Add a little bit of body text. Indian Ministry of Micro, Small
                  and Medium Enterprises issued Gazette notification to pave way
                  for implementation of the upward revision in the definition and
                  criteria of MSMEs in the country. The new definition and
                  criterion will come into effect from 1st July, 2020.
                </p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#515455]">
                  After 14 years since the MSME Development Act came into
                  existence in 2006, a revision in MSME definition was announced
                  in the Atmanirbhar Bharat package on 13th May, 2020. Starting
                  from Rs. 1799/-.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-black/5 bg-white/85 p-4 shadow-[0_18px_60px_rgba(20,22,23,0.07)] backdrop-blur"
                    >
                      <p className="text-2xl font-black text-[#a63f04]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#515455]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact-us"
                  className="btn-custom btn-primary mt-8"
                >
                  Know About Package <ArrowIcon />
                </Link>
              </div>

              <div data-aos="fade-left" data-aos-duration="850">
                <div className="rounded-lg border border-[#a63f04]/15 bg-white p-5 shadow-[0_32px_100px_rgba(166,63,4,0.15)] sm:p-6">
                  <div className="relative mb-6 min-h-[230px] overflow-hidden rounded-lg bg-[#141617] sm:min-h-[290px]">
                    <Image
                      src="/images/home-service-img.webp"
                      alt="MSME registration documents and business compliance support"
                      fill
                      priority
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141617]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#d29f81]">
                        Quick Enquiry
                      </p>
                      <p className="mt-2 text-2xl font-black">
                        Get MSME support from Patel Legal Advisors
                      </p>
                    </div>
                  </div>

                  <form className="grid gap-4" aria-label="MSME registration enquiry form">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="min-h-12 rounded-lg border border-black/10 bg-[#fdfbf8] px-4 text-sm font-bold text-[#141617] outline-none transition focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/15"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        className="min-h-12 rounded-lg border border-black/10 bg-[#fdfbf8] px-4 text-sm font-bold text-[#141617] outline-none transition focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/15"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className="min-h-12 rounded-lg border border-black/10 bg-[#fdfbf8] px-4 text-sm font-bold text-[#141617] outline-none transition focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/15"
                    />
                    <select
                      name="package"
                      className="min-h-12 rounded-lg border border-black/10 bg-[#fdfbf8] px-4 text-sm font-bold text-[#141617] outline-none transition focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/15"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose your package
                      </option>
                      <option>MSME Application</option>
                      <option>MSME Application Same Day</option>
                      <option>MSME Application Same Day + Trademark</option>
                    </select>
                    <textarea
                      name="message"
                      placeholder="Tell us about your business"
                      rows={4}
                      className="rounded-lg border border-black/10 bg-[#fdfbf8] px-4 py-3 text-sm font-bold text-[#141617] outline-none transition focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/15"
                    />
                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#a63f04] px-5 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#141617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2"
                    >
                      Contact Us <ArrowIcon />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto">
            <SectionHeading
              eyebrow="Definition"
              title="Definition of MSME"
              description="MSME stands for micro, small and medium enterprises and any enterprise that falls under any of these three categories. MSME enterprises are the backbone of any economy and an engine of economic growth."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-lg border border-black/5 bg-[#fbfaf8] p-7 shadow-[0_20px_70px_rgba(20,22,23,0.06)]">
                <p className="text-base leading-8 text-[#515455]">
                  MSME enterprises are a legion of economic growth, promoting
                  equitable development for all. MSME Enterprises are typically
                  more labor intensive than large corporates and provide
                  tremendous employment potential at a very low capital cost.
                </p>
              </article>
              <article className="rounded-lg border border-black/5 bg-[#141617] p-7 text-white shadow-[0_26px_90px_rgba(20,22,23,0.18)]">
                <p className="text-base leading-8 text-white/72">
                  Therefore, to promote and develop MSMEs, the MSMED Act of
                  India facilitates the promotion and development of enterprises
                  through many incentives, schemes and subsidies. Proprietorship,
                  partnership firms, LLPs, Private Limited Company&apos;s and
                  Public Limited Companies can register.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f3ee] py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div data-aos="fade-right" data-aos-duration="850">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#a63f04]">
                  Benefits
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-[#141617] sm:text-4xl">
                  Benefits of MSME Registration
                </h2>
              </div>
              <div
                className="rounded-lg border border-[#a63f04]/15 bg-white p-7 shadow-[0_24px_80px_rgba(166,63,4,0.10)]"
                data-aos="fade-left"
                data-aos-duration="850"
              >
                <p className="text-base leading-8 text-[#515455]">
                  The MSME registration is not statutory. However, the MSME
                  registration process in India has been conceptualised to
                  provide maximum benefits to all types of enterprises. After
                  registration, an enterprise becomes qualified to reap the
                  benefits offered under the MSMED Act.
                </p>
                <p className="mt-5 text-base leading-8 text-[#515455]">
                  Some benefits include easy sanction of bank loans, lower rates
                  of interest, excise exemption schemes, exemption under Direct
                  Tax Laws and statutory support such as reservation and the
                  interest on delayed payments Act.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-48 bg-[#f8f3ee]" />
          <div className="container relative z-10 mx-auto">
            <SectionHeading
              eyebrow="Checklist"
              title="Documents Required for MSME Registration"
              description="Select the business structure and keep the required records ready before filing."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {documentGroups.map((group, index) => (
                <article
                  key={group.title}
                  className="group rounded-lg border border-black/5 bg-white p-6 shadow-[0_24px_85px_rgba(20,22,23,0.08)] transition duration-500 hover:-translate-y-2 hover:border-[#a63f04]/30 hover:shadow-[0_34px_100px_rgba(166,63,4,0.15)]"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#141617] text-white transition group-hover:bg-[#a63f04]">
                    <span className="font-black">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-black uppercase">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm font-bold leading-6 text-[#515455]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f5e8df] text-[#a63f04]">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact-us"
                    className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#a63f04] px-4 py-3 text-sm font-black text-white transition hover:bg-[#141617]"
                  >
                    More Info <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fdfbf8] py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto">
            <SectionHeading
              eyebrow="Pricing"
              title="Choose Your Package"
              description="The screenshot highlights three MSME packages. Here they are redesigned as clear service cards."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <article
                  key={plan.title}
                  className={`rounded-lg border p-6 shadow-[0_24px_85px_rgba(20,22,23,0.07)] transition duration-500 hover:-translate-y-2 ${
                    index === 1
                      ? "border-[#a63f04]/35 bg-[#141617] text-white"
                      : "border-black/5 bg-white text-[#141617]"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <p
                    className={`text-sm font-black uppercase tracking-[0.16em] ${
                      index === 1 ? "text-[#d29f81]" : "text-[#a63f04]"
                    }`}
                  >
                    {plan.price}
                  </p>
                  <h3
                    className={`mt-4 text-2xl font-black ${
                      index === 1 ? "text-white" : "text-[#141617]"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex gap-3 text-sm font-bold leading-6 ${
                          index === 1 ? "text-white/72" : "text-[#515455]"
                        }`}
                      >
                        <span className="mt-0.5 text-[#a63f04]">
                          <CheckIcon />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact-us"
                    className={`mt-8 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-black transition ${
                      index === 1
                        ? "bg-white text-[#141617] hover:bg-[#a63f04] hover:text-white"
                        : "bg-[#a63f04] text-white hover:bg-[#141617]"
                    }`}
                  >
                    More Info <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto">
            <SectionHeading
              eyebrow="Process of MSME Registration"
              title="How to Register MSME"
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {processSteps.map((item, index) => (
                <article
                  key={item.step}
                  className={`rounded-lg border border-black/5 bg-[#f8f3ee] p-6 shadow-[0_18px_65px_rgba(20,22,23,0.06)] ${
                    index === 4 ? "lg:col-span-2" : ""
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="inline-flex w-fit rounded-lg bg-[#a63f04] px-4 py-2 text-sm font-black uppercase text-white">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-black">{item.title}</h3>
                      <p className="mt-3 text-base leading-8 text-[#515455]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid items-center gap-8 rounded-lg border border-black/5 bg-[#141617] p-6 text-white shadow-[0_30px_100px_rgba(20,22,23,0.2)] lg:grid-cols-[1fr_0.85fr] lg:p-8">
              <div>
                {processSteps.slice(0, 3).map((item) => (
                  <div key={`${item.step}-summary`} className="border-b border-white/10 py-5 last:border-b-0">
                    <h3 className="text-lg font-black text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-white">
                <Image
                  src="/images/home-why-choose-us.webp"
                  alt="MSME registration process support"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f3ee] py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto">
            <SectionHeading
              eyebrow="Why Us?"
              title="Practical support from people who understand business filings."
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyUs.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-black/5 bg-white p-6 text-center shadow-[0_20px_70px_rgba(20,22,23,0.07)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_95px_rgba(166,63,4,0.14)]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#f5e8df] text-xl font-black text-[#a63f04]">
                    0{index + 1}
                  </div>
                  <h3 className="mt-6 text-lg font-black uppercase text-[#a63f04]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#515455]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto">
            <SectionHeading
              eyebrow="Reviews"
              title="Read what our clients have to say"
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <article
                  key={review.name}
                  className="rounded-lg border border-black/5 bg-[#fdfbf8] p-7 shadow-[0_22px_78px_rgba(20,22,23,0.07)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_95px_rgba(166,63,4,0.14)]"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <p className="text-6xl font-black leading-none text-[#a63f04]">
                    &ldquo;
                  </p>
                  <h3 className="mt-3 text-lg font-black">-{review.name}</h3>
                  <p className="mt-5 text-sm font-bold leading-7 text-[#a63f04]">
                    {review.quote}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
