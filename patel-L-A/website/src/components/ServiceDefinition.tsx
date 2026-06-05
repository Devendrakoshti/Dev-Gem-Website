"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faLightbulb, faChartLine } from '@fortawesome/free-solid-svg-icons';

interface ServiceDefinitionProps {
  data: {
    title: string;
    paragraphs: string[];
  };
}

const ServiceDefinition: React.FC<ServiceDefinitionProps> = ({ data }) => {
  if (!data || !data.paragraphs || data.paragraphs.length === 0) return null;

  return (
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#141617 1px, transparent 1px), linear-gradient(90deg, #141617 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Title Area */}
          <div className="lg:col-span-5 lg:sticky lg:top-32" data-aos="fade-right">
            <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full mb-6 border border-slate-200">
              <FontAwesomeIcon icon={faBookOpen} className="text-[#a63f04] text-sm" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase">Understanding Concepts</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
              {data.title.split(' ').map((word, index) => 
                word.toLowerCase() === 'msme' ? (
                  <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-[#a63f04] to-[#e65a05]"> {word}</span>
                ) : (
                  <span key={index}> {word}</span>
                )
              )}
            </h2>
            
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#a63f04] to-transparent rounded-full mb-8"></div>
            
            {/* Feature Highlights beneath Title */}
            <div className="hidden lg:flex flex-col gap-6 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#a63f04]/10 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faChartLine} className="text-[#a63f04] text-lg" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Economic Growth Engine</h4>
                  <p className="text-sm text-slate-500">Driving equitable development and industrial production.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#a63f04]/10 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faLightbulb} className="text-[#a63f04] text-lg" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Incentives & Schemes</h4>
                  <p className="text-sm text-slate-500">Government subsidies provided under the MSMED Act.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="100">
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
              
              {/* Large quote mark decoration */}
              <div className="absolute top-6 left-8 text-8xl text-slate-200 opacity-50 font-serif leading-none pointer-events-none">
                &ldquo;
              </div>

              <div className="relative z-10 space-y-8 mt-4">
                {data.paragraphs.map((paragraph, idx) => (
                  <div key={idx} className="group">
                    <p className={`text-lg md:text-xl leading-relaxed text-slate-600 ${idx === 0 ? 'font-medium text-slate-800' : ''}`}>
                      {paragraph}
                    </p>
                    {idx !== data.paragraphs.length - 1 && (
                      <div className="w-full h-px bg-slate-200 mt-8 group-hover:bg-[#a63f04]/20 transition-colors duration-300"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Info Banner */}
              <div className="mt-10 bg-[#a63f04] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-[#a63f04]/20">
                <div>
                  <h4 className="font-bold text-lg mb-1">Need MSME Registration?</h4>
                  <p className="text-sm text-white/80">Proprietorships, Partnerships, LLPs & Companies are eligible.</p>
                </div>
                <button className="whitespace-nowrap px-6 py-3 bg-white text-[#a63f04] font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors shadow-sm">
                  Apply Now
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceDefinition;
