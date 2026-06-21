"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faAward } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServiceBenefitsProps {
  data: ServiceData;
}

const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({ data }) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_25%_25%,#a63f04_0_1px,transparent_1px),radial-gradient(circle_at_75%_75%,#a63f04_0_1px,transparent_1px)] [background-size:40px_40px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a63f04]/8 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#a63f04]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-[#a63f04]/15 text-[#e65a05] px-4 py-2 rounded-full border border-[#a63f04]/25 mb-6">
            <FontAwesomeIcon icon={faAward} className="text-sm" />
            <span className="text-xs font-black uppercase tracking-wider">Advantages</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            {data.benefitsSection?.title || 'Benefits'}
          </h2>
          <div className="mx-auto mt-6 w-20 h-1 bg-gradient-to-r from-[#a63f04] to-[#e65a05] rounded-full"></div>
        </div>
      {/* Process Steps */}
<div className="grid md:grid-cols-2 gap-6">
  {data.benefitsSection?.paragraphstitle?.map((title, idx) => (
    <div
      key={idx}
      className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-[#a63f04]/30 transition-all duration-500 hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={idx * 100}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#a63f04]/20 text-[#e65a05] font-bold">
          {String(idx + 1).padStart(2, "0")}
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">
            {title}
          </h3>

          <p className="text-slate-400 text-base leading-relaxed">
            {data.benefitsSection.paragraphs[idx]}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
    </section>
  );
};

export default ServiceBenefits;
