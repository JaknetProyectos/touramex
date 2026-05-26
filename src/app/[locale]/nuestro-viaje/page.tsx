"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useTranslations } from "next-intl";

import {
  Mountain,
  Compass,
  Sparkles,
} from "lucide-react";

export default function NosotrosPage() {
  const t = useTranslations("OurTravel");

  const missionParagraphs = t.raw(
    "mission.paragraphs"
  ) as string[];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#faf7ff] via-white to-[#eefcf5]">
      <Header />

      {/* Decorative Blurs */}
      <div className="pointer-events-none fixed left-0 top-0 h-[350px] w-[350px] rounded-full bg-violet-300/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-emerald-300/30 blur-3xl" />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/70 shadow-[0_20px_80px_rgba(139,92,246,0.12)] backdrop-blur-2xl">
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop"
                alt={t("hero.imageAlt")}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/70 via-violet-700/40 to-emerald-500/40" />
            </div>

            {/* Glow */}
            <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-400/20 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative z-10 px-6 py-20 md:px-14 md:py-28 lg:px-20 lg:py-32">
              <div className="max-w-4xl">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2 text-white backdrop-blur-md">
                  <Sparkles size={16} />

                  <span className="text-sm font-medium tracking-wide">
                    {t("hero.badge")}
                  </span>
                </div>

                <h1 className="mb-8 text-5xl font-black leading-[1.05] text-white md:text-7xl">
                  {t("hero.title")}
                </h1>

                <p className="max-w-3xl text-lg leading-relaxed text-white/90 md:text-2xl">
                  {t("hero.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT */}
            <div className="space-y-8">
              <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_10px_40px_rgba(139,92,246,0.08)] backdrop-blur-xl md:p-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-400 text-white shadow-lg">
                    <Mountain size={28} />
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                    {t("mission.title")}
                  </h2>
                </div>

                <div className="space-y-6">
                  {missionParagraphs.map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-relaxed text-gray-600"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="sticky top-10">
                <div className="relative overflow-hidden rounded-[36px] border border-white/50 shadow-[0_20px_60px_rgba(139,92,246,0.15)]">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop"
                    alt={t("sideCard.imageAlt")}
                    className="h-[700px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-800/20 to-emerald-500/10" />

                  <div className="absolute bottom-0 p-8 text-white md:p-10">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-md">
                      <Compass size={16} />

                      <span className="text-sm font-medium">
                        {t("sideCard.badge")}
                      </span>
                    </div>

                    <h3 className="mb-5 text-3xl font-black leading-tight md:text-4xl">
                      {t("sideCard.title")}
                    </h3>

                    <p className="text-lg leading-relaxed text-white/90">
                      {t("sideCard.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}