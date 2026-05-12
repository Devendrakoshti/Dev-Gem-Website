"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
  {
    title: "Trusted Advisory Partner",
    quote:
      "Their guidance helped us make confident decisions with clear communication, reliable planning, and thoughtful recommendations.",
    name: "Sophia Carter",
    role: "Operations Director",
  },
  {
    title: "Reliable Growth Support",
    quote:
      "The team brought structure and clarity to our investment process while keeping every step simple and measurable.",
    name: "Daniel Brooks",
    role: "Business Founder",
  },
];

function Stars() {
  return (
    <span className="flex items-center gap-1 text-[#4b5563]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          className="h-5 w-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="m10 1.7 2.46 5.02 5.54.8-4 3.9.94 5.51L10 14.33l-4.94 2.6L6 11.42l-4-3.9 5.54-.8L10 1.7Z" />
        </svg>
      ))}
    </span>
  );
}

export default function TestimonialSlider() {
  return (
    <section className="relative overflow-hidden bg-[#151d20] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(120deg,rgba(255,255,255,0.05)_0_18%,transparent_18%_100%),linear-gradient(35deg,transparent_0_42%,rgba(255,255,255,0.04)_42%_58%,transparent_58%_100%)] [background-size:520px_360px,640px_460px]" />
      <div className="absolute inset-0 bg-[#050b0d]/55" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 sm:px-9">
        <div
          className="mx-auto max-w-4xl text-center"
          data-aos="fade-up"
          data-aos-duration="850"
        >
          <p className="text-lg font-black">Our testimonial</p>
          <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            2356+ Customer Feedback&apos;s
          </h2>
        </div>

        <div className="mt-14" data-aos="fade-up" data-aos-delay="120">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
            }}
            loop
            spaceBetween={30}
            speed={800}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.4 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.6 },
            }}
            className="!overflow-visible"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={`${item.title}-${item.name}`} className="!h-auto">
                <article className="flex h-full min-h-[310px] flex-col rounded-xl bg-white p-8 text-[#071226] shadow-[0_24px_70px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:p-10">
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="mt-6 text-lg leading-8 text-slate-600">
                    &ldquo;{item.quote}
                  </p>
                  <div className="mt-8 border-t border-slate-200 pt-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xl font-black">{item.name}</p>
                        <p className="mt-2 text-sm text-slate-600">
                          {item.role.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="font-black text-[#071226]">
                            {item.role.split(" ").slice(-1)}
                          </span>
                        </p>
                      </div>
                      <Stars />
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonial-pagination mt-10 flex justify-center gap-3" />
        </div>
      </div>
    </section>
  );
}
