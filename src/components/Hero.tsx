"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  Calendar,
  Sparkles,
  MapPin,
} from "lucide-react";

import { useTranslations } from "next-intl";


export default function Hero() {
  const t = useTranslations("hero");

  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(t("travelers.options.one"));
  const [date, setDate] = useState("");

  const destinationOptions = [
    {
      slug: "cdmx",
      label: t("destinationOptions.cdmx"),
    },
    {
      slug: "experiencias-gastronomicas",
      label: t("destinationOptions.gastronomy"),
    },
    {
      slug: "guanajuato",
      label: t("destinationOptions.guanajuato"),
    },
    {
      slug: "los-cabos",
      label: t("destinationOptions.losCabos"),
    },
    {
      slug: "oaxaca",
      label: t("destinationOptions.oaxaca"),
    },
    {
      slug: "yucatan",
      label: t("destinationOptions.yucatan"),
    },
    {
      slug: "cancun",
      label: t("destinationOptions.cancun"),
    },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!destination) return;

    router.push(`/categoria/${destination}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://foodandpleasure.com/wp-content/uploads/2020/11/playas-economicas-en-mexico.jpg"
          alt={t("backgroundAlt")}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4bcc] via-[#4c1d95aa] to-[#166534bb]" />

        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-violet-400/30 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-green-400/30 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center text-white">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-xl">
          <Sparkles size={16} />
          {t("badge")}
        </div>

        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {t("title.first")}
          <span className="bg-gradient-to-r from-[#c084fc] to-[#4ade80] bg-clip-text text-transparent">
            {" "}
            {t("title.highlight")}
          </span>{" "}
          {t("title.last")}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          {t("description")}
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 w-full max-w-5xl rounded-[32px] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl"
        >
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.9fr_auto]">
            {/* DESTINATION */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-4 text-left shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-[#6d28d9]">
                <MapPin size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t("destination.label")}
                </p>

                {/** cdmx, gastronomía cdmx, guanajuato, los cabos, oaxaca, yucatan y cancún */}
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none"
                >
                  <option value="">
                    {t("destination.placeholder")}
                  </option>

                  {destinationOptions.map((dest) => (
                    <option key={dest.slug} value={dest.slug}>
                      {dest.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ADULTS */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-4 text-left shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-[#15803d]">
                <User size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t("travelers.label")}
                </p>

                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none"
                >
                  <option>{t("travelers.options.one")}</option>
                  <option>{t("travelers.options.two")}</option>
                  <option>{t("travelers.options.three")}</option>
                  <option>{t("travelers.options.four")}</option>
                  <option>{t("travelers.options.fivePlus")}</option>
                </select>
              </div>
            </div>

            {/* DATE */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-4 text-left shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-[#6d28d9]">
                <Calendar size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t("date")}
                </p>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={!destination}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#22c55e] px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Search size={18} />
              {t("search")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}