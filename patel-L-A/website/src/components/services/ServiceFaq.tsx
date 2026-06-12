"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServiceFaqProps {
  data: ServiceData;
}

const ServiceFaq: React.FC<ServiceFaqProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!data.faqs || data.faqs.length === 0) return null;

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a63f04]/15 to-transparent"></div>
      <div className="absolute -right-40 top-20 w-80 h-80 bg-[#a63f04]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-[0.4fr_1fr] gap-12 lg:gap-16">
          
          {/* Left Label */}
          <div className="lg:sticky lg:top-32 self-start" data-aos="fade-right" data-aos-duration="800">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a63f04] text-white shadow-lg shadow-[#a63f04]/25">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-lg" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-500 text-base leading-relaxed">
              Find answers to the most common questions about the registration process, eligibility, and benefits.
            </p>
            <div className="mt-6 w-20 h-1 bg-gradient-to-r from-[#a63f04] to-[#e65a05] rounded-full"></div>
          </div>

          {/* Right Accordion */}
          <div className="space-y-3" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            {data.faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`group rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-[#a63f04]/25 bg-gradient-to-r from-[#a63f04]/[0.03] to-transparent shadow-[0_8px_32px_rgba(166,63,4,0.08)]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a63f04] focus-visible:ring-offset-2 rounded-2xl"
                  >
                    {/* Number */}
                    <span className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg text-xs font-black transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#a63f04] text-white shadow-md shadow-[#a63f04]/25'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-[#a63f04]/10 group-hover:text-[#a63f04]'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <span className={`flex-1 font-bold text-base transition-colors duration-300 ${
                      isOpen ? 'text-[#a63f04]' : 'text-slate-800'
                    }`}>
                      {faq.question}
                    </span>

                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`flex-shrink-0 text-sm transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#a63f04]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.25rem] md:pl-[4.75rem]">
                      <p className="text-slate-600 text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
