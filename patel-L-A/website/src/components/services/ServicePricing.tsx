"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServicePricingProps {
  data: ServiceData;
}

const ServicePricing: React.FC<ServicePricingProps> = ({ data }) => {
  if (!data.pricing || data.pricing.length === 0) return null;

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent"></div>
      <div className="absolute -right-32 top-16 w-80 h-80 bg-[#a63f04]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-[#a63f04]/10 text-[#a63f04] px-4 py-2 rounded-full border border-[#a63f04]/20 mb-6">
            <FontAwesomeIcon icon={faCreditCard} className="text-sm" />
            <span className="text-xs font-black uppercase tracking-wider">Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Choose Your Package
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Compare the service packages and choose the level of support that fits your business.
          </p>
          <div className="mx-auto mt-6 w-20 h-1 bg-gradient-to-r from-[#a63f04] to-[#e65a05] rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {data.pricing.map((plan, idx) => {
            const featured = idx === 1;

            return (
              <article
                key={plan.title}
                className={`relative rounded-2xl border p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 ${
                  featured
                    ? 'border-[#a63f04]/35 bg-[#141617] text-white shadow-[0_24px_80px_rgba(20,22,23,0.18)]'
                    : 'border-slate-200 bg-slate-50/70 hover:border-[#a63f04]/25 hover:shadow-[0_20px_60px_rgba(166,63,4,0.10)]'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 120}
              >
                <div className={`rounded-xl p-5 text-center ${featured ? 'bg-[#a63f04]' : 'bg-[#d90909]'}`}>
                  <h3 className="text-xl font-black uppercase text-white">{plan.title}</h3>
                  {plan.note ? (
                    <p className="mt-1 text-xs font-black uppercase text-white/80">{plan.note}</p>
                  ) : null}
                  <p className="mt-3 text-3xl font-black text-white">{plan.price}</p>
                  <p className="text-xs font-bold uppercase text-white/75">All inclusive</p>
                </div>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex gap-3 text-sm font-bold leading-6 ${
                        featured ? 'text-white/72' : 'text-slate-600'
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="mt-1 h-4 w-4 shrink-0 text-[#a63f04]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact-us"
                  className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition ${
                    featured
                      ? 'bg-white text-[#141617] hover:bg-[#a63f04] hover:text-white'
                      : 'bg-[#a63f04] text-white hover:bg-[#141617]'
                  }`}
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
  );
};

export default ServicePricing;
