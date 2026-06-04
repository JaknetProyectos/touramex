"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCategory } from "@/hooks/useCategory";
import { useTours } from "@/hooks/useTours";

import { useLocale, useTranslations } from "next-intl";

import {
  Grid3X3,
  List,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

import { Link } from "@/i18n/routing";

type SortBy =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest-desc"
  | "newest-asc"
  | "name";

const categoryImages: Record<string, string> = {
  yucatan:
    "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1800&auto=format&fit=crop",

  oaxaca:
    "https://images.unsplash.com/photo-1568402102990-bc541580b59f?q=80&w=1800&auto=format&fit=crop",

  cdmx:
    "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=1800&auto=format&fit=crop",

  "puerto-vallarta":
    "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?q=80&w=1800&auto=format&fit=crop",

  guanajuato:
    "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=1800&auto=format&fit=crop",
};

export default function CategoryToursPage() {
  const t = useTranslations("categoryPage");

  const params = useParams();
  const locale = useLocale();

  const slug = params.slug as string;

  const { category, loading: categoryLoading } = useCategory(slug);

  const {
    tours,
    loading: toursLoading,
    error,
  } = useTours();

  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  const [sortBy, setSortBy] = useState<SortBy>("default");

  /* =========================
     CATEGORY JOIN MAP
  ========================= */

  const categoryAliases: Record<string, string[]> = {
    cdmx: ["cdmx", "experiencias-gastronomicas"],
  };

  const activeSlugs = categoryAliases[slug] || [slug];

  /* =========================
     FILTERED TOURS
  ========================= */

  const filteredTours = useMemo(() => {
    const filtered = tours.filter((tour) => {
      const normalizedDestination = tour.destination
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      return activeSlugs.includes(normalizedDestination);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }

      if (sortBy === "price-desc") {
        return b.price - a.price;
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "newest-desc") {
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      }

      if (sortBy === "newest-asc") {
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );
      }

      return 0;
    });
  }, [tours, activeSlugs, sortBy]);

  const loading = categoryLoading || toursLoading;

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-[#c084fc]/20 border-t-[#22c55e]" />

            <p className="text-lg font-medium text-gray-600">
              {t("loading")}
            </p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="max-w-xl rounded-[32px] border border-[#e9d5ff] bg-gradient-to-br from-white via-[#faf5ff] to-[#f0fdf4] p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#22c55e] text-white shadow-xl">
              <Sparkles size={34} />
            </div>

            <h1 className="mb-4 text-4xl font-black text-gray-900">
              {t("notFound.title")}
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {t("notFound.description")}
            </p>

            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#22c55e] px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {t("notFound.button")}
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              categoryImages[slug] ||
              "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1800&auto=format&fit=crop"
            }
            alt={category.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4be0] via-[#581c87cc] to-[#166534d0]" />

          <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-violet-400/30 blur-3xl" />

          <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-green-400/30 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl">
              <Sparkles size={16} />
              {t("hero.badge")}
            </div>

            <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
              {locale == "es" ? category.title : category.title_english}
            </h1>

            {category.description && (
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
                {locale == "es" ? category.description : category.description_english}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl">
                <p className="text-sm text-white/70">
                  {t("hero.available")}
                </p>

                <p className="text-3xl font-black text-white">
                  {filteredTours.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl">
                <p className="text-sm text-white/70">
                  {t("hero.destination")}
                </p>

                <p className="text-xl font-bold text-white">
                  México
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ff] via-white to-[#f0fdf4]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {/* TOOLBAR */}
          <div className="mb-10 flex flex-col gap-5 rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#7c3aed]">
                {t("toolbar.results")}
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-900">
                {filteredTours.length}{" "}
                {t("toolbar.experiences")}
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* VIEW MODE */}
              <div className="flex items-center rounded-2xl bg-[#f5f3ff] p-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${viewMode === "list"
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#22c55e] text-white shadow-lg"
                    : "text-gray-500 hover:bg-white"
                    }`}
                >
                  <List size={20} />
                </button>

                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${viewMode === "grid"
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#22c55e] text-white shadow-lg"
                    : "text-gray-500 hover:bg-white"
                    }`}
                >
                  <Grid3X3 size={20} />
                </button>
              </div>

              {/* SORT */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortBy)
                }
                className="h-14 rounded-2xl border border-[#ddd6fe] bg-white px-5 font-medium text-gray-700 shadow-sm outline-none transition-all focus:border-[#7c3aed] focus:ring-4 focus:ring-[#c084fc]/20"
              >
                <option value="default">
                  {t("sort.default")}
                </option>

                <option value="price-asc">
                  {t("sort.priceAsc")}
                </option>

                <option value="price-desc">
                  {t("sort.priceDesc")}
                </option>

                <option value="newest-desc">
                  {t("sort.newest")}
                </option>

                <option value="newest-asc">
                  {t("sort.oldest")}
                </option>

                <option value="name">
                  {t("sort.name")}
                </option>
              </select>
            </div>
          </div>

          {/* TOURS */}
          <div
            className={
              viewMode === "grid"
                ? "grid gap-8 md:grid-cols-3 xl:grid-cols-3"
                : "space-y-8"
            }
          >
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className={`group overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${viewMode === "list"
                  ? "flex flex-col lg:flex-row"
                  : ""
                  }`}
              >
                {/* IMAGE */}
                <div
                  className={`relative overflow-hidden ${viewMode === "list"
                    ? "lg:w-[380px]"
                    : ""
                    }`}
                >
                  <img
                    src={
                      tour.image_url ||
                      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop"
                    }
                    alt={tour.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${viewMode === "list"
                      ? "h-[320px] lg:h-full"
                      : "h-[280px]"
                      }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4bcc] via-transparent to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex-1">
                    <h2 className="text-3xl font-black leading-tight text-gray-900">
                      {locale == "es" ? tour.title : tour.title_english}
                    </h2>

                    <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                      <div className="flex items-center gap-2 rounded-full bg-[#f5f3ff] px-4 py-2 text-[#6d28d9]">
                        <MapPin size={16} />

                        <span className="font-medium">
                          {tour.destination}
                        </span>
                      </div>

                      {tour.duration && (
                        <div className="flex items-center gap-2 rounded-full bg-[#f0fdf4] px-4 py-2 text-[#15803d]">
                          <Clock size={16} />

                          <span className="font-medium">
                            {tour.duration}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="mt-6 line-clamp-3 text-[15px] leading-relaxed text-gray-600">
                      {locale == "es" ? tour.description : tour.description_english}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex flex-col gap-5 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("price.from")}
                      </p>

                      <p className="bg-gradient-to-r from-[#7c3aed] to-[#22c55e] bg-clip-text text-4xl font-black text-transparent">
                        $
                        {Number(tour.price).toLocaleString()}
                      </p>

                      <p className="text-sm font-medium text-gray-500">
                        {t("price.tax")}
                      </p>
                    </div>

                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#22c55e] px-7 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      {t("buttons.view")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {!filteredTours.length && (
            <div className="py-24 text-center">
              <div className="mx-auto max-w-2xl rounded-[40px] border border-[#e9d5ff] bg-gradient-to-br from-white via-[#faf5ff] to-[#f0fdf4] p-12 shadow-2xl">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#22c55e] text-white shadow-xl">
                  <Sparkles size={42} />
                </div>

                <h2 className="text-4xl font-black text-gray-900">
                  {t("empty.title")}
                </h2>

                <p className="mt-5 text-lg leading-relaxed text-gray-600">
                  {t("empty.description")}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}