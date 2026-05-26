"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useTours } from "@/hooks/useTours";
import { useLocale, useTranslations } from "next-intl";
import {
  MapPin,
  Users,
  Plus,
  Minus,
  List,
  Grid3X3,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type SortBy =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest-desc"
  | "newest-asc"
  | "name";

export default function ToursPage() {
  const t = useTranslations("toursPage");
  const locale = useLocale();
  const isEnglish = locale === "en";

  const [selectedDestination, setSelectedDestination] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [adults, setAdults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { addToCart } = useCart();
  const { tours, loading, error } = useTours({ page: 10 });

  const destinations = useMemo(() => {
    return Array.from(
      new Set(tours.map((tour) => tour.destination).filter(Boolean))
    );
  }, [tours]);

  const filteredAndSortedTours = useMemo(() => {
    const filtered = tours.filter(
      (tour) =>
        !selectedDestination ||
        tour.destination === selectedDestination
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;

      if (sortBy === "name") {
        const titleA = isEnglish
          ? a.title_english || a.title
          : a.title;
        const titleB = isEnglish
          ? b.title_english || b.title
          : b.title;

        return titleA.localeCompare(titleB);
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

    return sorted;
  }, [tours, selectedDestination, sortBy, isEnglish]);

  const itemsPerPage = 6;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedTours.length / itemsPerPage)
  );

  const paginatedTours = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredAndSortedTours.slice(start, start + itemsPerPage);
  }, [filteredAndSortedTours, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDestination, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAddToCart = (tourId: string) => {
    const tour = tours.find((t) => t.id === tourId);

    if (tour && adults > 0) {
      addToCart(tour, adults);
      setAdults(0);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#dbeafe] bg-gradient-to-br from-[#eef5ff] via-white to-[#fdf2f8]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#4f8bf4]/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E85A5A]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#bfdbfe] bg-white/80 px-4 py-2 text-sm font-semibold text-[#4f8bf4] shadow-sm backdrop-blur">
              <Sparkles size={16} />
              {t("hero.badge")}
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-gray-900 md:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="text-lg leading-relaxed text-gray-600">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[320px_1fr]">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-4">
            <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#4f8bf4]">
                  <SlidersHorizontal size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t("sidebar.title")}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t("sidebar.subtitle")}
                  </p>
                </div>
              </div>

              {/* DESTINATION */}
              <div className="mb-8">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin size={16} className="text-[#4f8bf4]" />
                  {t("sidebar.destination")}
                </label>

                <select
                  value={selectedDestination}
                  onChange={(e) =>
                    setSelectedDestination(e.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-[#4f8bf4] focus:bg-white focus:ring-4 focus:ring-[#4f8bf4]/10"
                >
                  <option value="">
                    {t("sidebar.allDestinations")}
                  </option>

                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* ADULTS */}
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users size={16} className="text-[#E85A5A]" />
                  {t("sidebar.adults")}
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setAdults(Math.max(0, adults - 1))
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E85A5A] text-[#E85A5A] transition-colors hover:bg-[#E85A5A] hover:text-white"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="text-2xl font-black text-gray-900">
                    {adults}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E85A5A] text-[#E85A5A] transition-colors hover:bg-[#E85A5A] hover:text-white"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button className="w-full rounded-2xl bg-[#4f8bf4] px-5 py-4 font-semibold text-white shadow-sm transition-all hover:bg-[#3a7ae5] hover:shadow-md">
                {t("sidebar.viewAvailability")}
              </button>
            </div>
          </aside>

          {/* CONTENT */}
          <div>
            {/* TOPBAR */}
            <div className="mb-8 flex flex-col gap-5 rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-[#4f8bf4]">
                  {t("results.badge")}
                </p>

                <h2 className="text-3xl font-black text-gray-900">
                  {t("results.title", {
                    count: filteredAndSortedTours.length,
                  })}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                      viewMode === "list"
                        ? "bg-[#4f8bf4] text-white shadow-sm"
                        : "text-gray-500 hover:bg-white"
                    }`}
                  >
                    <List size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                      viewMode === "grid"
                        ? "bg-[#4f8bf4] text-white shadow-sm"
                        : "text-gray-500 hover:bg-white"
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SortBy)
                  }
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4f8bf4] focus:bg-white focus:ring-4 focus:ring-[#4f8bf4]/10"
                >
                  <option value="default">{t("sort.default")}</option>
                  <option value="price-asc">{t("sort.priceAsc")}</option>
                  <option value="price-desc">{t("sort.priceDesc")}</option>
                  <option value="newest-desc">{t("sort.newestDesc")}</option>
                  <option value="newest-asc">{t("sort.newestAsc")}</option>
                  <option value="name">{t("sort.name")}</option>
                </select>
              </div>
            </div>

            {/* STATES */}
            {loading && (
              <div className="rounded-[32px] border border-gray-100 bg-white p-14 text-center shadow-sm">
                <p className="text-lg text-gray-500">
                  {t("states.loading")}
                </p>
              </div>
            )}

            {!loading && !error && (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 md:grid-cols-2"
                      : "space-y-6"
                  }
                >
                  {paginatedTours.map((tour) => {
                    const localizedTitle = isEnglish
                      ? tour.title_english || tour.title
                      : tour.title;

                    const localizedDescription = isEnglish
                      ? tour.description_english || tour.description
                      : tour.description;

                    return (
                      <div
                        key={tour.id}
                        className={`group overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                          viewMode === "list"
                            ? "flex flex-col md:flex-row"
                            : ""
                        }`}
                      >
                        <div
                          className={`relative overflow-hidden ${
                            viewMode === "list"
                              ? "md:w-[340px] md:flex-shrink-0"
                              : ""
                          }`}
                        >
                          <img
                            src={tour.image_url || ""}
                            alt={localizedTitle}
                            className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                              viewMode === "list"
                                ? "h-72 md:h-full"
                                : "h-72"
                            }`}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#4f8bf4] backdrop-blur">
                            {tour.destination}
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex-1">
                            <h3 className="mb-3 text-2xl font-black text-gray-900">
                              {localizedTitle}
                            </h3>

                            <p className="line-clamp-3 leading-relaxed text-gray-600">
                              {localizedDescription}
                            </p>
                          </div>

                          <div className="mt-8 flex flex-col gap-5 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                {t("price.from")}
                              </p>

                              <div className="flex items-end gap-1">
                                <span className="text-3xl font-black text-[#4f8bf4]">
                                  ${Number(tour.price).toLocaleString()}
                                </span>

                                <span className="pb-1 text-gray-500">
                                  MXN
                                </span>
                              </div>

                              <p className="text-sm text-gray-500">
                                {t("price.vatIncluded")}
                              </p>
                            </div>

                            <div className="flex flex-row gap-3">
                              <Link href={`/tours/${tour.slug}`}>
                                <button
                                  type="button"
                                  disabled={adults <= 0}
                                  onClick={() =>
                                    handleAddToCart(tour.id)
                                  }
                                  className="rounded-2xl border border-[#E85A5A] px-5 py-3 text-sm font-semibold text-[#E85A5A] transition-all hover:bg-[#E85A5A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {t("buttons.add")}
                                </button>
                              </Link>

                              <Link
                                href={`/tours/${tour.slug}`}
                                className="inline-flex items-center gap-2 rounded-2xl bg-[#4f8bf4] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3a7ae5]"
                              >
                                {t("buttons.details")}
                                <ArrowRight size={16} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PAGINATION */}
                {filteredAndSortedTours.length > itemsPerPage && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-2xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {t("pagination.previous")}
                    </button>

                    <div className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-gray-600 shadow-sm">
                      {t("pagination.pageOf", {
                        current: currentPage,
                        total: totalPages,
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(totalPages, p + 1)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-2xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {t("pagination.next")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}