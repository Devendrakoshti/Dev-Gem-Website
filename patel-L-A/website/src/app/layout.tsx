import AosInit from "@/components/AosInit";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AosInit />
        {children}
      </body>
    </html>
  );
}
