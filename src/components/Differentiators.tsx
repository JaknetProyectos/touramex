"use client";

import {
  ClipboardList,
  Phone,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function Differentiators() {
  const t = useTranslations("Differentiators");

  const items = [
    {
      icon: ClipboardList,
      title: t("items.planning.title"),
      description: t("items.planning.description"),
      gradient:
        "from-violet-500 via-violet-600 to-fuchsia-500",
      glow: "bg-violet-500/20",
    },

    {
      icon: Phone,
      title: t("items.support.title"),
      description: t("items.support.description"),
      gradient:
        "from-emerald-400 via-emerald-500 to-teal-500",
      glow: "bg-emerald-500/20",
    },

    {
      icon: MapPin,
      title: t("items.variety.title"),
      description: t("items.variety.description"),
      gradient:
        "from-cyan-400 via-sky-500 to-violet-500",
      glow: "bg-sky-500/20",
    },

    {
      icon: Heart,
      title: t("items.satisfaction.title"),
      description: t("items.satisfaction.description"),
      gradient:
        "from-pink-500 via-rose-500 to-orange-400",
      glow: "bg-rose-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8f5ff] to-[#eefbf3] px-4 py-16 md:py-24">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-[-120px] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </div>

          <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            {t("title.line1")}
            <span className="block bg-gradient-to-r from-violet-700 to-emerald-500 bg-clip-text text-transparent">
              {t("title.highlight")}
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 p-7 shadow-xl shadow-violet-950/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* GLOW */}
              <div
                className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${item.glow} opacity-70`}
              />

              {/* ICON */}
              <div
                className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
              >
                <item.icon
                  size={30}
                  strokeWidth={1.8}
                />
              </div>

              {/* CONTENT */}
              <div className="relative">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>

              {/* BOTTOM ACCENT */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${item.gradient}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}