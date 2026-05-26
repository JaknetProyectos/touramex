"use client";

import { Link } from "@/i18n/routing";

import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function CustomTour() {
  const t = useTranslations("CustomTour");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8f5ff] to-[#eefbf3] px-4 py-16 md:py-24">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-80px] top-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-80px] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* CONTENT */}
          <div>
            <h2 className="max-w-2xl text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              {t("title.line1")}
              <span className="block bg-gradient-to-r from-violet-700 to-emerald-500 bg-clip-text text-transparent">
                {t("title.highlight")}
              </span>
            </h2>

            <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              {t("badge")}
            </div>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-600">
              <p>{t("description.paragraph1")}</p>

              <p>{t("description.paragraph2")}</p>

              <p>{t("description.paragraph3")}</p>

              <p>{t("description.paragraph4")}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={"/contacto"}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-700 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/30"
              >
                {t("buttons.quote")}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href={"/cotiza"}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white/80 px-6 py-4 font-semibold text-emerald-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <CreditCard className="h-5 w-5" />
                {t("buttons.pay")}
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 shadow-2xl shadow-violet-950/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-emerald-400/10" />

            <img
              src="https://images.unsplash.com/photo-1518659526054-190340b32735?q=80&w=1000&auto=format&fit=crop"
              alt={t("imageAlt")}
              className="h-[350px] w-full object-cover md:h-[500px]"
            />

            {/* FLOATING CARD */}
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/30 bg-white/70 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500 text-white shadow-lg">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t("floatingCard.label")}
                  </p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {t("floatingCard.title")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}