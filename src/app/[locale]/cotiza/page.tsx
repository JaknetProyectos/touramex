"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCart } from "@/context/CartContext";

import { useTranslations } from "next-intl";

import {
  Minus,
  Plus,
  ShoppingCart,
  Receipt,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function CustomTourPage() {
  const t = useTranslations("customQuote");

  const router = useRouter();

  const { addToCart } = useCart();

  const [quoteId, setQuoteId] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(1);

  const parsedAmount = Number(amount || 0);

  const total = parsedAmount * quantity;

  const handleAddToCart = () => {
    if (!quoteId.trim()) {
      alert(t("alerts.quoteRequired"));

      return;
    }

    if (!parsedAmount || parsedAmount <= 0) {
      alert(t("alerts.invalidAmount"));

      return;
    }

    addToCart(
      {
        id: `custom-${quoteId}`,
        slug: `custom-${quoteId}`,

        title: t("cart.title"),
        title_english: t("cart.titleEnglish"),

        description: `${t(
          "cart.quoteLabel"
        )}: ${quoteId}`,

        description_english: `Quote ID: ${quoteId}`,

        price: parsedAmount,

        image_url:
          "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop",

        destination: t("cart.destination"),

        duration: t("cart.duration"),
      },
      quantity
    );

    router.push("/carrito");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#f7f5ff] via-white to-[#eefcf5]">
      <Header />

      {/* Decorative Blur */}
      <div className="pointer-events-none fixed left-0 top-0 h-[350px] w-[350px] rounded-full bg-violet-300/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-emerald-300/30 blur-3xl" />

      <section className="relative px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_20px_80px_rgba(139,92,246,0.12)] backdrop-blur-xl lg:grid-cols-2">
            {/* LEFT */}
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-[720px]">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop"
                alt={t("hero.imageAlt")}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-violet-700/50 via-violet-500/20 to-emerald-500/40" />

              <div className="absolute left-8 top-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-5 py-2 text-white backdrop-blur-md">
                  <Sparkles size={16} />

                  <span className="text-sm font-medium">
                    {t("hero.badge")}
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex h-full items-end p-8 md:p-10">
                <div className="max-w-lg rounded-3xl border border-white/20 bg-white/15 p-8 text-white backdrop-blur-xl">
                  <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">
                    {t("hero.title")}
                  </h1>

                  <p className="text-base leading-relaxed text-white/90 md:text-lg">
                    {t("hero.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex flex-col justify-center p-6 md:p-10 lg:p-14">
              {/* Blur */}
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />

              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-10">
                  <p className="mb-3 font-semibold text-violet-600">
                    {t("content.badge")}
                  </p>

                  <h2 className="mb-5 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                    {t("content.title")}
                  </h2>

                  <p className="text-lg leading-relaxed text-gray-600">
                    {t("content.description")}
                  </p>
                </div>

                {/* Quote ID */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    {t("form.quoteId")}
                  </label>

                  <div className="relative">
                    <Receipt
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
                      size={18}
                    />

                    <input
                      type="text"
                      value={quoteId}
                      onChange={(e) =>
                        setQuoteId(e.target.value)
                      }
                      placeholder={t(
                        "form.quotePlaceholder"
                      )}
                      className="w-full rounded-2xl border border-violet-100 bg-white/80 py-4 pl-12 pr-4 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    {t("form.amount")}
                  </label>

                  <div className="relative">
                    <CreditCard
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
                      size={18}
                    />

                    <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full rounded-2xl border border-emerald-100 bg-white/80 py-4 pl-16 pr-4 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    {t("form.people")}
                  </label>

                  <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white/80 px-5 py-4 backdrop-blur-sm">
                    <span className="font-medium text-gray-700">
                      {t("form.quantity")}
                    </span>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          setQuantity(
                            Math.max(
                              1,
                              quantity - 1
                            )
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 text-violet-600 transition-all hover:bg-violet-600 hover:text-white"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-8 text-center text-lg font-bold text-gray-900">
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          setQuantity(quantity + 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 text-emerald-600 transition-all hover:bg-emerald-600 hover:text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-emerald-500 p-[1px]">
                  <div className="rounded-[23px] bg-white px-6 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-gray-500">
                          {t("total.label")}
                        </p>

                        <h3 className="bg-gradient-to-r from-violet-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                          $
                          {total.toLocaleString()}
                          .00
                        </h3>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-500 text-white shadow-lg">
                        <CreditCard size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-emerald-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-violet-500/20"
                >
                  <ShoppingCart size={22} />

                  {t("cta")}
                </button>

                <p className="mt-5 text-center text-sm leading-relaxed text-gray-500">
                  {t("footer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}