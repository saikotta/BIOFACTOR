import React from "react";

export default function ScienceTechnologyPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] bg-black text-white font-sans flex flex-col justify-between p-8 sm:p-12 md:p-16 max-w-[1700px] mx-auto select-none">
      <div className="my-auto py-24 flex flex-col items-start gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          SCIENCE &amp; TECHNOLOGY
        </h1>
        <p className="text-lg text-white/60 font-light">
          Page coming soon.
        </p>
      </div>

      <footer className="text-xs text-white/40">
        &copy; {new Date().getFullYear()} Biofactor Biologicals.
      </footer>
    </main>
  );
}
