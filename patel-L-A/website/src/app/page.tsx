import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050b0d]">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl px-6 py-20 text-white sm:px-9">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Professional navigation ready for your live website.
        </h1>
      </main>
    </div>
  );
}
