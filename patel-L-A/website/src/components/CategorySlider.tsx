"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
  {
    title: "All type of business registrations are available with us.",
    jobs: "REGISTRATIONS",
    icon: "document",
  },
  {
    title: "All type of compliances services are available with us.",
    jobs: "REGULATORY COMPLIANCES",
    icon: "support",
  },
  {
    title: "Accounting & Book keeping services on Monthly/ annual basis.",
    jobs: "ACCOUNTING & BOOK KEEPING",
    icon: "finance",
  },
  {
    title: "Legal notice reply and other hearing services are available with us",
    jobs: "LEGAL SERVICES",
    icon: "network",
  },
  {
    title: "Business tax filing as well as individual tax filing services are available with us.",
    jobs: "GST & TAX FILINGS",
    icon: "document",
  },
  {
    title: "Business wind up services are available with us.",
    jobs: "WIND UP BUSINESS",
    icon: "finance",
  },
];

function CategoryIcon({ type }: { type: string }) {
  if (type === "support") {
    return (
      <svg aria-hidden="true" className="h-16 w-16" fill="none" viewBox="0 0 64 64">
        <path d="M18 31v-3a14 14 0 0 1 28 0v3" stroke="currentColor" strokeWidth="3" />
        <path d="M18 31h-3a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4h3V31ZM46 31h3a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-3V31Z" stroke="currentColor" strokeWidth="3" />
        <path d="M42 45c-2 5-6 8-10 8s-8-3-10-8M32 39v14M24 56h16M25 28c2-3 4-5 7-5s5 2 7 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "finance") {
    return (
      <svg aria-hidden="true" className="h-16 w-16" fill="none" viewBox="0 0 64 64">
        <path d="M10 52h44M14 52V35h9v17M28 52V28h9v24M42 52V20h9v32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="m12 33 11-9 10 6 17-17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="49" cy="15" r="8" stroke="currentColor" strokeWidth="3" />
        <path d="M49 11v8M46 14h5a2 2 0 1 1 0 4h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "network") {
    return (
      <svg aria-hidden="true" className="h-16 w-16" fill="none" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="3" />
        <path d="M32 8v12M32 44v12M8 32h12M44 32h12M15 15l9 9M40 40l9 9M49 15l-9 9M24 40l-9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="8" r="4" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="56" r="4" stroke="currentColor" strokeWidth="3" />
        <circle cx="8" cy="32" r="4" stroke="currentColor" strokeWidth="3" />
        <circle cx="56" cy="32" r="4" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-16 w-16" fill="none" viewBox="0 0 64 64">
      <path d="M18 8h24l10 10v38H18V8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 8v11h10M25 24h18M25 32h18M25 40h11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m39 48 12-12 5 5-12 12-7 2 2-7Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
      />
    </svg>
  );
}

export default function CategorySlider() {
  return (
    <section className="overflow-hidden bg-[#f6fbff] py-20 text-[#050b0d] sm:py-24 lg:py-28">
      <div className="container mx-auto max-w-7xl px-6 sm:px-9">
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-aos="fade-right">
            <span class="sub-title">About Business</span>
            <h2 className="mt-6 ">CA, CS, LAWYERS AT ONE PLACE</h2>
          </div>
        </div>

        <div className="mt-16" data-aos="fade-up">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            navigation={{
              prevEl: ".category-slider-prev",
              nextEl: ".category-slider-next",
            }}
            spaceBetween={24}
            speed={750}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {categories.map((category) => (
              <SwiperSlide key={`${category.title}-${category.jobs}`} className="!h-auto">
                <article className="group relative flex min-h-[170px] items-center overflow-hidden rounded-lg bg-white p-8 shadow-[0_20px_50px_rgba(36,73,104,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(166,63,4,0.18)]">
                  <div className="absolute left-0 top-0 h-full w-32 rounded-r-full bg-primary/10 transition-all duration-500 group-hover:w-40 group-hover:bg-primary/15" />
                  <div className="relative z-10 flex w-full items-center gap-7">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg text-primary transition duration-500 group-hover:scale-110">
                      <CategoryIcon type={category.icon} />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-flex rounded-lg bg-primary px-5 py-2 text-sm font-black text-white">
                        {category.jobs}
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-[#111827]">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-14 flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous category"
              className="category-slider-prev flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_16px_35px_rgba(166,63,4,0.22)] transition hover:-translate-y-1 hover:bg-[#843103] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next category"
              className="category-slider-next flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_16px_35px_rgba(166,63,4,0.22)] transition hover:-translate-y-1 hover:bg-[#843103] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
