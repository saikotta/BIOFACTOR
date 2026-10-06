"use client";

import React from "react";

interface BiofactorScrollHeroProps {
  children: React.ReactNode;
}

export default function BiofactorScrollHero({ children }: BiofactorScrollHeroProps) {
  return (
    <section className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] bg-[#EAF3EA] overflow-hidden z-10 flex flex-col justify-between">
      {children}
    </section>
  );
}
