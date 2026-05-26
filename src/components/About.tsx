"use client";

import { Link } from "@/i18n/routing";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7f5ff] to-[#eefbf3] px-4 py-20 md:py-28">
      {/* BACKGROUND BLURS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* CONTENT */}
          <div>
            {/* BADGE */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              {t("badge")}
            </div>

            {/* TITLE */}
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl">
              {t("title.first")}{" "}
              <span className="bg-gradient-to-r from-violet-600 to-emerald-500 bg-clip-text text-transparent">
                {t("title.highlight")}
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              {t("description")}
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-emerald-500 px-7 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                {t("cta")}

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            {/* DECORATION */}
            <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-[2rem] bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-20 blur-2xl md:block" />

            <div className="absolute -bottom-10 -right-10 hidden h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl md:block" />

            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 shadow-2xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop"
                alt={t("imageAlt")}
                className="h-[420px] w-full object-cover md:h-[560px]"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* FLOATING CARD */}
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-white/15 p-5 text-white shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-white/80">
                      {t("card.subtitle")}
                    </p>

                    <h3 className="text-lg font-bold">
                      {t("card.title")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END IMAGE */}
        </div>
      </div>
    </section>
  );
}