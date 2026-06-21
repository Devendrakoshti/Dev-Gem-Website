"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServiceProcessProps {
  data: ServiceData;
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ data }) => {
  if (!data.process) return null;

  return (
    <section className="relative bg-[#f8f3ee] py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#a63f04_1px,transparent_1px),linear-gradient(90deg,#a63f04_1px,transparent_1px)] [background-size:60px_60px]"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#a63f04]/8 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d29f81]/15 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a63f04]">How It Works</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {data.process.title}
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            A simple, streamlined process to get your registration done with expert guidance at every step.
          </p>
          <div className="mx-auto mt-6 w-20 h-1 bg-gradient-to-r from-[#a63f04] to-[#e65a05] rounded-full"></div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
          {data.process.steps.map((step, idx) => (
            <div key={idx} className="relative" data-aos="fade-up" data-aos-delay={idx * 120}>
              {/* Connector line for desktop */}
              {idx < data.process!.steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-0 h-[2px] z-0">
                  <div className="w-full h-full bg-gradient-to-r from-[#a63f04]/30 to-[#a63f04]/10 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#a63f04]/40">
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </div>
                  </div>
                </div>
              )}

              <div className="group relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-[0_20px_60px_rgba(166,63,4,0.12)] hover:border-[#a63f04]/25 transition-all duration-500 hover:-translate-y-2 z-10">
                {/* Step Number */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a63f04] to-[#d45205] text-white text-2xl font-black mb-6 shadow-lg shadow-[#a63f04]/25 group-hover:scale-110 transition-transform duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{step}</h3>
              </div>


              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
