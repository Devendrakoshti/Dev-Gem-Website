"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShieldAlt, faClock, faUserTie } from '@fortawesome/free-solid-svg-icons';
import type { ServiceData } from '@/app/services/service-data';

interface ServiceHeroProps {
  data: ServiceData;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ data }) => {
  return (
    <section className="relative w-full bg-slate-50 py-16 md:py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#a63f04]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-[40rem] h-[40rem] bg-[#a63f04]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-slate-200/50 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-3/5 flex flex-col space-y-8" data-aos="fade-right">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#a63f04]/10 text-[#a63f04] px-4 py-2 rounded-full w-max border border-[#a63f04]/20 shadow-sm">
              <FontAwesomeIcon icon={faShieldAlt} className="text-sm" />
              <span className="text-sm font-semibold tracking-wide uppercase">Premium Legal Services</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              {data.title.split(' ').map((word, index) => 
                word.toLowerCase() === 'registration' ? (
                  <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-[#a63f04] to-[#e65a05]"> {word}</span>
                ) : (
                  <span key={index}> {word}</span>
                )
              )}
            </h1>

            {/* Content */}
            <div className="space-y-5 text-slate-600 text-lg leading-relaxed relative">
              <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-[#a63f04] to-transparent rounded-full hidden md:block"></div>
              {(data.paragraphs || (data.description ? [data.description] : [])).map((paragraph, idx) => (
                <p key={idx} className="md:pl-2">{paragraph}</p>
              ))}
            </div>

            {/* Price & CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Professional Fees</span>
                <span className="text-2xl font-bold text-[#a63f04]">{data.price || 'Contact for Pricing'}</span>
              </div>
              
              <button className="group relative inline-flex items-center justify-center px-8 py-5 text-base font-bold text-white transition-all duration-200 bg-[#a63f04] border border-transparent rounded-xl hover:bg-[#8a3403] shadow-[0_8px_20px_rgba(166,63,4,0.25)] hover:shadow-[0_10px_25px_rgba(166,63,4,0.35)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a63f04]">
                {data.cta || 'KNOW ABOUT PACKAGE'}
                <svg className="w-5 h-5 ml-2 transition-transform duration-200 transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-200 mt-2">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <FontAwesomeIcon icon={faCheckCircle} className="text-[#a63f04]" />
                <span>100% Online</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <FontAwesomeIcon icon={faClock} className="text-[#a63f04]" />
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <FontAwesomeIcon icon={faUserTie} className="text-[#a63f04]" />
                <span>Expert Assistance</span>
              </div>
            </div>

          </div>

          {/* Right Content Area (Form) */}
          <div className="w-full lg:w-2/5" data-aos="fade-left" data-aos-delay="100">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Form decorative top edge */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a63f04] via-[#e65a05] to-[#a63f04]"></div>
              
              <div className="text-center mb-8">
                <span className="text-2xl font-bold text-slate-900 mb-1">Get Expert Assistance</span>
                <p className="text-slate-500 text-sm">Fill the form below and our legal experts will contact you shortly.</p>
              </div>

              <form className="space-y-5">
                <div className="space-y-1">
                  {/* <label htmlFor="hero-name" className="text-sm font-semibold text-slate-700 ml-1">Full Name</label> */}
                  <input 
                    type="text" 
                    id="hero-name"
                    placeholder="Full Name" 
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20 transition-all outline-none text-slate-800"
                  />
                </div>
                
                <div className="space-y-1">
                  {/* <label htmlFor="hero-email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</label> */}
                  <input 
                    type="email" 
                    id="hero-email"
                    placeholder="Email Address" 
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20 transition-all outline-none text-slate-800"
                  />
                </div>
                
                <div className="space-y-1">
                  {/* <label htmlFor="hero-phone" className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label> */}
                  <div className="flex relative">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 font-medium text-sm">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      id="hero-phone"
                      placeholder="Phone Number" 
                      className="w-full px-4 py-3 rounded-r-xl bg-slate-50 border border-slate-200 focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20 transition-all outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  {/* <label htmlFor="hero-message" className="text-sm font-semibold text-slate-700 ml-1">Message (Optional)</label> */}
                  <textarea 
                    id="hero-message"
                    rows={3}
                    placeholder="Message" 
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#a63f04] focus:ring-2 focus:ring-[#a63f04]/20 transition-all outline-none text-slate-800 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-full py-4 px-6 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-[#a63f04] to-[#d45205] hover:from-[#8a3403] hover:to-[#a63f04] transform transition-all hover:-translate-y-0.5 shadow-lg shadow-[#a63f04]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a63f04]"
                >
                  Request Callback
                </button>
              </form>
              
              <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faShieldAlt} />
                Your information is 100% secure & confidential.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
