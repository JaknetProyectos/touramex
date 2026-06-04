"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Markdown from "@/components/Markdown";

import { useTour } from "@/hooks/useTour";
import { useTours } from "@/hooks/useTours";

import { useCart } from "@/context/CartContext";

import { useLocale, useTranslations } from "next-intl";

import {
  MapPin,
  Clock,
  Users,
  Plus,
  Minus,
  Calendar,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();

  const locale = useLocale();

  const t = useTranslations("tourDetail");

  const slug = params.id as string;

  const { tour, loading, error } = useTour(slug);

  const { tours } = useTours();

  const [adults, setAdults] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const { addToCart } = useCart();

  const relatedTours = useMemo(() => {
    if (!tour) return [];

    console.log(tour)

    if (tour.destination === "CDMX" || tour.destination === "experiencias-gastronomicas") {
      return tours.filter(item =>
        item.id !== tour.id &&
        item.destination === tour.destination &&
        (item.destination === "CDMX" || item.destination === "experiencias-gastronomicas")
      ).slice(0, 3)
    }

    return tours
      .filter(
        (item) =>
          item.id !== tour.id &&
          item.destination === tour.destination
      )
      .slice(0, 3);
  }, [tours, tour]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fbff]">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !tour) {
    return (
      <main className="min-h-screen bg-[#f8fbff]">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("notFoundTitle")}
          </h1>

          <p className="text-gray-600 mb-8">
            {t("notFoundDescription")}
          </p>

          <button
            onClick={() => router.push("/tours")}
            className="inline-flex items-center gap-2 bg-[#4f8bf4] text-white px-6 py-3 rounded-full hover:bg-[#3a7ae5] transition-colors"
          >
            <ArrowLeft size={18} />
            {t("backToTours")}
          </button>
        </div>

        <Footer />
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(tour, adults, selectedDate);
    router.push("/carrito");
  };

  const totalPrice = Number(tour.price) * adults;

  const tourTitle =
    locale === "en"
      ? tour.title_english || tour.title
      : tour.title;

  const tourDescription =
    locale === "en"
      ? tour.description_english ||
      tour.description
      : tour.description;

  return (
    <main className="min-h-screen bg-[#060816] overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="relative h-[500px] md:h-[650px] overflow-hidden">
        <img
          src={tour.image_url || ""}
          alt={tourTitle}
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#060816]/40 via-[#060816]/60 to-[#060816]" />

        {/* Blur Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-14 w-full relative z-10">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              {t("backToTours")}
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm">
                  <MapPin size={16} className="text-emerald-300" />
                  <span>{tour.destination}</span>
                </div>

                {tour.duration && (
                  <div className="backdrop-blur-xl bg-white/10 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm">
                    <Clock size={16} className="text-purple-300" />
                    <span>{tour.duration}</span>
                  </div>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
                {tourTitle}
              </h1>

              <p className="text-white/70 text-lg mt-6 max-w-2xl leading-relaxed">
                {t("heroDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
            {/* Left */}
            <div className="space-y-8">
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center">
                    <MapPin className="text-white" size={22} />
                  </div>

                  <div>
                    <p className="text-emerald-300 text-sm font-medium">
                      {t("information")}
                    </p>

                    <h2 className="text-3xl font-bold text-white">
                      {t("descriptionTitle")}
                    </h2>
                  </div>
                </div>

                <Markdown
                  className="text-white/70 markdown leading-relaxed text-lg"
                  content={tourDescription}
                />
              </div>


              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div>
                    <p className="text-emerald-300 text-sm font-medium">
                      {t("disclaimer")}
                    </p>
                  </div>
                </div>
              </div>
            </div>



            {/* Sidebar */}
            <aside className="lg:sticky lg:top-6">
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-400/20 rounded-full blur-3xl" />

                <div className="relative z-10 p-8">
                  {/* Price */}
                  <div className="text-center mb-8">
                    <p className="text-white/60 uppercase tracking-[0.2em] text-xs mb-3">
                      {t("from")}
                    </p>

                    <h3 className="text-6xl font-black text-white leading-none">
                      $
                      {Number(tour.price).toLocaleString()}
                    </h3>

                    <p className="text-white/60 mt-3">
                      MXN ({t("taxIncluded")})
                    </p>

                    <p className="text-white/60 mt-3">
                      {t("perPerson")}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-white mb-3">
                      {t("tourDate")}
                    </label>

                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                        size={18}
                      />

                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) =>
                          setSelectedDate(e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min={
                          new Date()
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                    </div>
                  </div>

                  {/* Adults */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-white mb-3">
                      {t("numberOfAdults")}
                    </label>

                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <Users
                            className="text-white/70"
                            size={18}
                          />
                        </div>

                        <span className="text-white/80">
                          {t("adults")}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setAdults(
                              Math.max(1, adults - 1)
                            )
                          }
                          className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-purple-500 transition-colors"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-8 text-center font-bold text-xl text-white">
                          {adults}
                        </span>

                        <button
                          onClick={() =>
                            setAdults(adults + 1)
                          }
                          className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-3xl bg-gradient-to-br from-purple-500/20 to-emerald-400/20 border border-white/10 p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-sm mb-1">
                          {t("total")}
                        </p>

                        <p className="text-4xl font-black text-white">
                          $
                          {totalPrice.toLocaleString()}
                          .00
                        </p>

                        <p className="text-white/60 text-sm mb-1">
                          MXN
                        </p>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                        <ShoppingCart
                          className="text-white"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-purple-500 to-emerald-400 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(168,85,247,0.35)]"
                  >
                    {t("addToCart")}
                  </button>

                  <p className="text-center text-sm text-white/50 mt-5">
                    {t("reserveNow")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      {!!relatedTours.length && (
        <section className="relative py-20 border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1020]" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="mb-12">
              <p className="text-emerald-300 font-medium mb-3">
                {t("relatedSubtitle")}
              </p>

              <h2 className="text-4xl md:text-5xl font-black text-white">
                {t("relatedTitle")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => {
                const relatedTitle =
                  locale === "en"
                    ? relatedTour.title_english ||
                    relatedTour.title
                    : relatedTour.title;

                const relatedDescription =
                  locale === "en"
                    ? relatedTour.description_english ||
                    relatedTour.description
                    : relatedTour.description;

                return (
                  <div
                    key={relatedTour.id}
                    className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/10 transition-all"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedTour.image_url || ""}
                        alt={relatedTitle}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-transparent to-transparent" />

                      <div className="absolute top-5 right-5 backdrop-blur-xl bg-white/10 border border-white/10 px-4 py-2 rounded-full">
                        <span className="text-sm font-bold text-white">
                          $
                          {Number(
                            relatedTour.price
                          ).toLocaleString()}{" "}
                          MXN
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <MapPin
                            size={15}
                            className="text-emerald-300"
                          />

                          <span>
                            {relatedTour.destination}
                          </span>
                        </div>

                        {relatedTour.duration && (
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Clock
                              size={15}
                              className="text-purple-300"
                            />

                            <span>
                              {relatedTour.duration}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {relatedTitle}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-7">
                        {relatedDescription}
                      </p>

                      <Link
                        href={`/tours/${relatedTour.slug}`}
                        className="inline-flex items-center justify-center w-full bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-emerald-400 transition-all"
                      >
                        {t("viewDetails")}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}