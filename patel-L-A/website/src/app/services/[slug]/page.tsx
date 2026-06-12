import { services } from "../service-data";
import type { ServiceData } from "../service-data";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServicePricing from "@/components/services/ServicePricing";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCTA from "@/components/services/ServiceCTA";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// SEO Metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service: ServiceData | undefined = services[slug];

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.description,

    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.description,
      type: "website",
    },
  };
}

// Service Page
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service: ServiceData | undefined = services[slug];

  if (!service) {
    notFound();
  }

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
