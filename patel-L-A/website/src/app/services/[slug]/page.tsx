const services = [
  "msme-registration",
];

export async function generateStaticParams() {
  return services.map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
