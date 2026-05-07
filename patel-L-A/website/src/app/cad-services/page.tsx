import ServiceBanner from "@/components/ServiceBanner";

export default function CADServicesPage() {
  return (
    <>
      <ServiceBanner
  title="CAD Drafting Services"
  description="Accurate CAD drafting solutions."

  image={{
    src: "/images/cad-banner.webp",
    alt: "CAD drafting services",
    width: 1920,
    height: 1080,
  }}
/>
    </>
  );
}