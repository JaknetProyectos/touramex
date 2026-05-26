"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useCategories } from "@/hooks/useCategories";

import {
  ArrowRight,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "next-intl";

const categoryImages: Record<string, string> = {
  yucatan:
    "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=400&auto=format&fit=crop",
  oaxaca:
    "https://images.unsplash.com/photo-1568402102990-bc541580b59f?q=80&w=400&auto=format&fit=crop",
  cdmx:
    "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=400&auto=format&fit=crop",
  "puerto-vallarta":
    "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?q=80&w=400&auto=format&fit=crop",
  guanajuato:
    "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=400&auto=format&fit=crop",
};

const excludedSlugs = ["featured", "popular", "all", "recommended"];

export default function Destinations() {
  const t = useTranslations("Destinations");
  const { categories, loading } = useCategories();

  const filteredCategories = useMemo(() => {
    const allowedSlugs = Object.keys(categoryImages);

    return categories
      .filter(
        (category) =>
          allowedSlugs.includes(category.slug) &&
          !excludedSlugs.includes(category.slug)
      )
      .sort(
        (a, b) => allowedSlugs.indexOf(a.slug) - allowedSlugs.indexOf(b.slug)
      );
  }, [categories]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5b3df5] via-[#6d4cff] to-[#3dbb8b] px-4 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur-xl">
            <Compass size={28} />
          </div>

          <h2 className="mb-3 text-3xl font-black text-white md:text-4xl">
            {t("loading.title")}
          </h2>

          <p className="text-white/80">{t("loading.description")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5b3df5] via-[#6d4cff] to-[#3dbb8b] px-4 py-16 md:py-24">
      {/* Background blur */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-140px] top-[-120px] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
            <Sparkles size={16} />
            {t("badge")}
          </div>

          <h2 className="mb-5 text-4xl font-black tracking-tight text-white md:text-5xl">
            {t("title.line1")}
            <span className="text-emerald-300"> {t("title.highlight")}</span>
          </h2>

          <p className="text-lg leading-relaxed text-white/80">
            {t("description")}
          </p>
        </div>

        {/* Destinations */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Image */}
                <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white/20 shadow-lg">
                  <img
                    src={
                      categoryImages[category.slug] ||
                      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                    <MapPin size={12} />
                    {t("card.label")}
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {category.title}
                  </h3>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-all duration-300 group-hover:gap-3">
                    {t("card.explore")}
                    <ArrowRight size={15} />
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