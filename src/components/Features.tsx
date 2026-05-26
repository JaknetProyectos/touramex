"use client";

import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      title: t("features.guides.title"),
      description: t("features.guides.description"),
    },
    {
      title: t("features.unique.title"),
      description: t("features.unique.description"),
    },
    {
      title: t("features.prices.title"),
      description: t("features.prices.description"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5b3df5] via-[#6d4cff] to-[#3dbb8b] px-4 py-16 md:py-24">
      {/* Background blur */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
              {t("badge")}
            </div>

            <h2 className="mb-10 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              {t("title.line1")}
              <br />
              {t("title.line2")}
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
                >
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-white/85">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative flex flex-col items-end gap-6 overflow-hidden">
            <div className="w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-xl md:w-[85%]">
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop"
                alt={t("images.guidesAlt")}
                className="h-[240px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            {/* El overflow horizontal se corrige eliminando márgenes negativos */}
            <div className="relative mr-0 md:mr-8">
              <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl" />

              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
                alt={t("images.boatAlt")}
                className="relative h-[240px] w-[240px] rounded-full border-4 border-white/40 object-cover shadow-2xl md:h-[320px] md:w-[320px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}