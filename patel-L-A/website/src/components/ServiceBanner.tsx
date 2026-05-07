import Image from "next/image";

type ServiceBannerProps = {
  title: string;
  description: string;

  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export default function ServiceBanner({
  title,
  description,
  image,
}: ServiceBannerProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="object-cover w-full h-full absolute inset-0"
      />

      <div className="relative z-10 container mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          {title}
        </h1>

        <p className="max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}