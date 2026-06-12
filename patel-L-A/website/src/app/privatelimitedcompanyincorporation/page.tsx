import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceCTA from "@/components/services/ServiceCTA";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServicePricing from "@/components/services/ServicePricing";
import ServiceProcess from "@/components/services/ServiceProcess";
import { services } from "@/app/services/service-data";

const service = services.privatelimitedcompanyincorporation;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
};

export default function PrivateLimitedCompanyIncorporationPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main className="main">
        <ServiceHero data={service} />
        <ServiceOverview data={service} />
        <ServiceBenefits data={service} />
        <ServicePricing data={service} />
        <ServiceProcess data={service} />
        <ServiceFaq data={service} />
        <ServiceCTA data={service} />
        <Footer />
      </main>
    </div>
  );
}
