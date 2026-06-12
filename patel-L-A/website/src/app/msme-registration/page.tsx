import { services } from "../services/service-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCTA from "@/components/services/ServiceCTA";

import type { Metadata } from "next";

const msmeData = services["msme-registration"];

export const metadata: Metadata = {
  title: msmeData.metaTitle,
  description: msmeData.metaDescription,
  openGraph: {
    title: msmeData.metaTitle,
    description: msmeData.metaDescription,
    type: "website",
  },
};

export default function MSMERegistrationPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main className="main">
        <ServiceHero data={msmeData} />
        <ServiceOverview data={msmeData} />
        <ServiceBenefits data={msmeData} />
        <ServiceProcess data={msmeData} />
        <ServiceFaq data={msmeData} />
        <ServiceCTA data={msmeData} />
        <Footer />
      </main>
    </div>
  );
}
