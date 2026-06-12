"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faLandmark } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServiceOverviewProps {
  data: ServiceData;
}

const ServiceOverview: React.FC<ServiceOverviewProps> = ({ data }) => {
  if (!data.definition) return null;

  const overviewCard = data.overviewCard || {
    label: 'Government of India',
    title: 'MSMED Act, 2006',
  };

  const overviewHighlights =
    data.overviewHighlights || [
      { label: 'Micro Enterprise', value: 'Up to Rs. 1 Cr', detail: 'Investment' },
      { label: 'Small Enterprise', value: 'Up to Rs. 10 Cr', detail: 'Investment' },
      { label: 'Medium Enterprise', value: 'Up to Rs. 50 Cr', detail: 'Investment' },
    ];

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a63f04]/20 to-transparent"></div>
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#a63f04]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -right-32 bottom-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-[0.4fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32" data-aos="fade-right" data-aos-duration="800">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a63f04] text-white shadow-lg shadow-[#a63f04]/25">
                <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">Overview</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {data.definition.title}
            </h2>
            <div className="mt-6 w-20 h-1 bg-gradient-to-r from-[#a63f04] to-[#e65a05] rounded-full"></div>

            <div className="hidden lg:flex mt-10 items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/80 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a63f04]/10 text-[#a63f04]">
                <FontAwesomeIcon icon={faLandmark} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{overviewCard.label}</p>
                <p className="text-xs text-slate-500">{overviewCard.title}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            <div className="space-y-6">
              {data.definition.paragraphs.map((paragraph, idx) => (
                <div key={idx} className="group relative pl-6 border-l-2 border-slate-200 hover:border-[#a63f04] transition-colors duration-300">
                  <p className="text-slate-600 text-lg leading-relaxed">{paragraph}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {overviewHighlights.map((item, idx) => (
                <div
                  key={item.label}
                  className="group relative p-5 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 shadow-sm hover:border-[#a63f04]/30 hover:shadow-[0_16px_48px_rgba(166,63,4,0.1)] transition-all duration-500 hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <p className="text-xs font-black uppercase tracking-wider text-[#a63f04] mb-3">{item.label}</p>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{item.detail}</p>
                    <p className="text-lg font-extrabold text-slate-800">{item.value}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#a63f04] to-[#e65a05] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
