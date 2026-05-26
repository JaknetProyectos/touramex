"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { useTours } from "@/hooks/useTours";

import {
  ArrowRight,
  Compass,
  MapPin,
} from "lucide-react";

export default function Experiences() {
  const t = useTranslations("Experiences");

  const { tours, loading } = useTours({
    limit: 3,
    sortBy: "created_at",
    order: "desc",
  });

  if (loading) {
    return (
      <section
        id="tours"
        className="relative overflow-hidden bg-white px-4 py-16 md:py-24"
      >
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-emerald-400 text-white shadow-xl">
              <Compass size={28} />
            </div>

            <h2 className="mb-3 text-3xl font-black text-gray-900 md:text-4xl">
              {t("loading.title")}
            </h2>

            <p className="max-w-xl text-gray-600">
              {t("loading.description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="tours"
      className="relative overflow-hidden bg-white px-4 py-16 md:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl">
              {t("title.line1")}
              <span className="bg-gradient-to-r from-violet-600 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                {t("title.highlight")}
              </span>
            </h2>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-700 hover:shadow-lg"
          >
            {t("viewAll")}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-3">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group relative block overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={tour.image_url || ""}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b31] via-[#140b31]/40 to-transparent" />

                {/* Floating badge */}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
                  <Compass size={14} />
                  {t("card.badge")}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur-md">
                    <MapPin size={14} />
                    {tour.destination || t("card.defaultDestination")}
                  </div>

                  <h3 className="mb-3 text-2xl font-black leading-tight text-white">
                    {tour.title}
                  </h3>

                  <p className="line-clamp-2 text-sm leading-relaxed text-white/85">
                    {tour.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-all duration-300 group-hover:gap-3">
                    {t("card.explore")}
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}