import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  Compass,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#140f24] via-[#1d1633] to-[#120f1d] text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* TOP */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_0.8fr]">
          {/* BRAND */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500 shadow-lg shadow-violet-500/20">
                <Compass className="h-7 w-7 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Touramex
                </h2>

                <p className="text-sm text-white/60">
                  {t("brand.subtitle")}
                </p>
              </div>
            </div>

            <p className="max-w-md leading-relaxed text-white/70">
              {t("brand.description")}
            </p>

            {/* BADGES */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />

                <span className="text-sm font-medium text-white/80">
                  {t("badges.securePayments")}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <Sparkles className="h-5 w-5 text-violet-400" />

                <span className="text-sm font-medium text-white/80">
                  {t("badges.personalizedAttention")}
                </span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Image
                src="/cards.png"
                alt="cards"
                width={150}
                height={30}
              />
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 backdrop-blur-xl">
              {t("contact.title")}
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-violet-500">
                  <MapPin className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold">
                    {t("contact.location")}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/70">
                    {t("contact.address")}
                  </p>
                </div>
              </div>

              <a
                href="mailto:hola@touramex.com"
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-violet-400/30 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400">
                  <Mail className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0">
                  <h3 className="mb-1 text-lg font-bold">
                    {t("contact.email")}
                  </h3>

                  <p className="truncate text-sm text-white/70 transition-colors group-hover:text-white">
                    hola@touramex.com
                  </p>
                </div>
              </a>

              <a
                href="tel:5552059560"
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500">
                  <Phone className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold">
                    {t("contact.phone")}
                  </h3>

                  <p className="text-sm text-white/70 transition-colors group-hover:text-white">
                    55 5205 9560
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 backdrop-blur-xl">
              {t("legal.title")}
            </div>

            <div className="space-y-3">
              <Link
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
              >
                <span>
                  {t("legal.privacy")}
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
              >
                <span>
                  {t("legal.terms")}
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
              >
                <span>
                  {t("legal.refunds")}
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center md:flex-row">
          <p className="text-sm text-white/50">
            {t("copyright")}
          </p>

          <p className="text-sm text-white/40">
            {t("designed")}
          </p>
        </div>
      </div>
    </footer>
  );
}