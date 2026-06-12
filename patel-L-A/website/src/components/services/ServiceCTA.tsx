"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPhoneAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServiceCTAProps {
  data: ServiceData;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({ data }) => {
  return (
    <section className="relative bg-[#141617] py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a63f04]/15 via-transparent to-[#a63f04]/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a63f04]/30 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#a63f04]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#d29f81]/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:50px_50px]"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          
          {/* Left */}
          <div data-aos="fade-right" data-aos-duration="800">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a63f04] text-white shadow-lg shadow-[#a63f04]/30">
                <FontAwesomeIcon icon={faHeadset} className="text-lg" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d29f81]">Get Started Today</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-2xl">
              {data.ctaTitle || (
                <>
                  Ready to Register Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e65a05] to-[#d29f81]">Business as MSME?</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-white/60 text-lg max-w-xl leading-relaxed">
              {data.ctaDescription ||
                'Our expert team of CAs, CS & Lawyers will guide you through the entire registration process. Get started in minutes.'}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            <Link
              href="/contact-us"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 text-base font-bold text-white bg-[#a63f04] rounded-xl hover:bg-[#8a3403] shadow-[0_8px_24px_rgba(166,63,4,0.35)] hover:shadow-[0_12px_32px_rgba(166,63,4,0.45)] transition-all duration-300 hover:-translate-y-1"
            >
              {data.cta || 'Get Started'}
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="tel:+919680719296"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 text-base font-bold text-white border-2 border-white/20 rounded-xl hover:border-[#a63f04] hover:bg-[#a63f04]/10 transition-all duration-300 hover:-translate-y-1"
            >
              <FontAwesomeIcon icon={faPhoneAlt} />
              Call Us Now
            </Link>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200">
          {[
            { number: '28k+', label: 'Happy Clients' },
            { number: '5+', label: 'Years Experience' },
            { number: '100%', label: 'Online Process' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <p className="text-3xl font-black text-[#e65a05]">{item.number}</p>
              <p className="text-sm font-bold text-white/50">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
