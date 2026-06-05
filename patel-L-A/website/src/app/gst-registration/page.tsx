import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceDefinition from "@/components/ServiceDefinition";
import { services } from "@/app/services/service-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: services["gst-registration"].metaTitle,
  description: services["gst-registration"].metaDescription,
};


export default function GSTRegistrationPage() {
  const data = services["gst-registration"];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf8]">
      <Navbar />
      
      <main className="flex-grow">
        <ServiceHero data={data} />
        {data.definition && <ServiceDefinition data={data.definition} />}
      </main>

      <Footer />
    </div>
  );
}
