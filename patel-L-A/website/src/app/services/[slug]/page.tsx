import { services } from "../service-data";
import { notFound } from "next/navigation";

import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCTA from "@/components/services/ServiceCTA";

type PageProps = {
  params: {
    slug: string;
  };
};

// SEO Metadata
export async function generateMetadata({ params }: PageProps) {
  const service = services[params.slug];

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
export default function ServicePage({ params }: PageProps) {
  const service = services[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceHero data={service} />
      <ServiceOverview data={service} />
      <ServiceBenefits data={service} />
      <ServiceProcess data={service} />
      <ServiceFaq data={service} />
      <ServiceCTA data={service} />
    </>
  );
}