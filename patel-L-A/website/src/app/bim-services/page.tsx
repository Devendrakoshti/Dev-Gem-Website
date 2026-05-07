import ServiceBanner from "@/components/ServiceBanner";

export default function BIMServicesPage() {
  return (
    
    <ServiceBanner
      title="BIM Services"
      description="Professional BIM outsourcing services."

      image={{
        src: "/images/services/bim-banner.webp",
        alt: "BIM modeling services",
        width: 1920,
        height: 1080,
      }}
    />
  );
}