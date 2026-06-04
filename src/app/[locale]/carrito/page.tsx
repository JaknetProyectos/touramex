"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAlert } from "@/context/AlertContext";
import { processEtominPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";

import {
  ArrowLeft,
  BadgePercent,
  Banknote,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  Minus,
  Plus,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

import { useTranslations } from "next-intl";
import Image from "next/image";

const COUPONS = [
  { code: "TOURA10", discount: 10 },
  { code: "MEXICO15", discount: 15 },
  { code: "AVENTURA20", discount: 20 },
] as const;

type Coupon = (typeof COUPONS)[number];

type CheckoutForm = {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  telefono: string;
  calle: string;
  numero: string;
  colonia: string;
  state: string;
  cp: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expMonth: string;
  expYear: string;
  cvv: string;
};

const EMPTY_FORM: CheckoutForm = {
  firstName: "",
  lastName: "",
  city: "",
  email: "",
  telefono: "",
  calle: "",
  numero: "",
  colonia: "",
  state: "",
  cp: "",
  country: "México",
  cardNumber: "",
  cardName: "",
  expMonth: "",
  expYear: "",
  cvv: "",
};

const inputClass =
  "w-full rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition-colors placeholder:text-gray-400 focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/10";

const iconInputClass =
  "w-full rounded-2xl border border-white/70 bg-white py-3 pl-11 pr-4 outline-none transition-colors placeholder:text-gray-400 focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/10";

function sanitizeCardNumber(value: string) {
  return value;
}

function buildOrderId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `GB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  }

  return `GB-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

function formatCardDisplay(value: string) {
  const digits = value;
  return digits;
}

function CartSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-white to-[#ecfdf5]">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <div className="mb-4 h-5 w-40 animate-pulse rounded-full bg-gray-200" />
          <div className="mb-4 h-12 w-[420px] max-w-full animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-5 w-[560px] max-w-full animate-pulse rounded-full bg-gray-200" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl">
              <div className="mb-4 h-7 w-48 animate-pulse rounded-full bg-gray-200" />
              <div className="space-y-4">
                <div className="h-32 animate-pulse rounded-3xl bg-gray-100" />
                <div className="h-32 animate-pulse rounded-3xl bg-gray-100" />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(34,197,94,0.08)] backdrop-blur-xl">
              <div className="mb-4 h-7 w-56 animate-pulse rounded-full bg-gray-200" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl">
              <div className="mb-6 h-7 w-56 animate-pulse rounded-full bg-gray-200" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-24 animate-pulse rounded-2xl bg-gray-100 md:col-span-2" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100 md:col-span-2" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
              </div>
              <div className="mt-6 h-14 animate-pulse rounded-2xl bg-gray-100" />
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-4">
            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(34,197,94,0.08)] backdrop-blur-xl">
              <div className="mb-5 h-7 w-36 animate-pulse rounded-full bg-gray-200" />
              <div className="space-y-4">
                <div className="h-4 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 animate-pulse rounded-full bg-gray-100" />
                <div className="mt-4 h-14 animate-pulse rounded-2xl bg-gray-100" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function CartPage() {
  const t = useTranslations("cart");

  const { items, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } =
    useCart();
  const { showAlert } = useAlert();

  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponMessage, setCouponMessage] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    ...EMPTY_FORM,
    country: t("form.defaults.country"),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeItems = mounted ? items : [];

  const subtotal = useMemo(() => Number(getTotal()) || 0, [getTotal, items]);
  const itemCount = useMemo(() => Number(getItemCount()) || 0, [getItemCount, items]);

  const coupon = useMemo(() => {
    const normalized = appliedCoupon.trim().toUpperCase();
    return COUPONS.find((item) => item.code === normalized) ?? null;
  }, [appliedCoupon]);

  const discountAmount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const vatAmount = subtotalAfterDiscount * 0.16;
  const total = Math.max(0, subtotalAfterDiscount);

  const fullAddress = [form.calle.trim(), form.numero.trim(), form.colonia.trim()]
    .filter(Boolean)
    .join(", ");

  const handleApplyCoupon = () => {
    const normalized = couponInput.trim().toUpperCase();

    if (!normalized) {
      setAppliedCoupon("");
      setCouponMessage(t("coupon.messages.empty"));
      showAlert({
        title: t("alerts.couponEmptyTitle"),
        message: t("alerts.couponEmptyMessage"),
        type: "warning",
      });
      return;
    }

    const found = COUPONS.find((item) => item.code === normalized);

    if (!found) {
      setAppliedCoupon("");
      setCouponMessage(t("coupon.messages.invalid"));
      showAlert({
        title: t("alerts.couponInvalidTitle"),
        message: t("alerts.couponInvalidMessage"),
        type: "error",
      });
      return;
    }

    setAppliedCoupon(found.code);
    setCouponMessage(t("coupon.messages.applied", { discount: found.discount }));
    setCheckoutError("");
    showAlert({
      title: t("alerts.couponAppliedTitle"),
      message: t("alerts.couponAppliedMessage", { discount: found.discount }),
      type: "success",
    });
  };

  async function handlePayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!safeItems.length) {
      showAlert({
        title: t("alerts.cartEmptyTitle"),
        message: t("alerts.cartEmptyMessage"),
        type: "error",
      });
      return;
    }

    if (!e.currentTarget.reportValidity()) return;

    const amount = Number(total.toFixed(2));
    if (amount <= 0) {
      showAlert({
        title: t("alerts.invalidTotalTitle"),
        message: t("alerts.invalidTotalMessage"),
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setCheckoutError("");

    try {
      const orderId = buildOrderId();

      const paymentResult = await processEtominPayment({
        amount,
        orderId,
        customer: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          city: form.city.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          direccion: fullAddress,
          state: form.state.trim(),
          cp: form.cp.trim(),
          country: form.country.trim(),
        },
        cardData: {
          number: form.cardNumber.trim(),
          name: form.cardName.trim(),
          month: form.expMonth.trim(),
          year: form.expYear.trim(),
          cvv: form.cvv.trim(),
        },
      });

      const approved = paymentResult?.status === "APPROVED";

      console.log(paymentResult);

      if (!approved) {
        throw new Error(paymentResult?.status || t("errors.paymentRejected"));
      }

      const emailResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          total: formatPrice(total),
          couponCode: coupon?.code ?? null,
          discountPercent: coupon?.discount ?? 0,
          paymentResult,
          items: safeItems,
          customer: {
            nombre: `${form.firstName.trim()} ${form.lastName.trim()}`,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            telefono: form.telefono.trim(),
            city: form.city.trim(),
            calle: form.calle.trim(),
            numero: form.numero.trim(),
            colonia: form.colonia.trim(),
            direccion: fullAddress,
            state: form.state.trim(),
            cp: form.cp.trim(),
            country: form.country.trim(),
          },
        }),
      });

      let emailWarning = "";

      if (!emailResponse.ok) {
        emailWarning = t("alerts.emailIssueFallback");
        try {
          const data = await emailResponse.json();
          if (data?.error) emailWarning = data.error;
        } catch {
          // Se conserva el mensaje genérico.
        }
      }

      clearCart();
      setCheckoutSuccess(true);

      if (emailWarning) {
        showAlert({
          title: t("alerts.paymentApprovedTitle"),
          message: t("alerts.paymentApprovedWithWarningMessage", {
            warning: emailWarning,
          }),
          type: "warning",
        });
      } else {
        showAlert({
          title: t("alerts.paymentSuccessTitle"),
          message: t("alerts.paymentSuccessMessage"),
          type: "success",
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("errors.unexpected");

      setCheckoutError(message);
      showAlert({
        title: t("alerts.paymentErrorTitle"),
        message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!mounted) return <CartSkeleton />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-white to-[#ecfdf5]">
      <Header />

      <section className="relative overflow-hidden border-b border-[#e9e4ff] bg-gradient-to-br from-[#ede9fe] via-white to-[#dcfce7]">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#7c3aed]/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#22c55e]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ddd6fe] bg-white/80 px-4 py-2 text-sm font-medium text-[#6d28d9] shadow-sm backdrop-blur-xl">
              <ShoppingBag size={16} />
              {t("hero.badge")}
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#1f2937] md:text-5xl">
              {t("hero.title")}
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-gray-600">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl">
                <ShieldCheck size={16} className="text-[#16a34a]" />
                {t("hero.badges.safePayment")}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl">
                <ReceiptText size={16} className="text-[#7c3aed]" />
                {t("hero.badges.emailConfirmation")}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl">
                <Sparkles size={16} className="text-[#22c55e]" />
                {t("hero.badges.personalizedAttention")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {checkoutSuccess ? (
          <div className="rounded-[32px] border border-[#dbeafe] bg-white/90 p-8 shadow-[0_10px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl md:p-12">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#dcfce7] px-4 py-2 text-sm font-medium text-[#15803d]">
                <CheckCircle2 size={16} />
                {t("success.badge")}
              </div>

              <h2 className="mb-4 text-3xl font-black text-gray-900 md:text-4xl">
                {t("success.title")}
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {t("success.description")}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#22c55e] px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:scale-[1.01]"
                >
                  <ArrowLeft size={18} />
                  {t("success.continueExploring")}
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {t("success.backHome")}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1.45fr_0.95fr]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_10px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("cartHeader.title")}
                    </h2>
                    <p className="text-gray-500">
                      {t("cartHeader.count", {
                        itemCount,
                        serviceWord:
                          itemCount === 1
                            ? t("cartHeader.serviceSingular")
                            : t("cartHeader.servicePlural"),
                        productCount: safeItems.length,
                        productWord:
                          safeItems.length === 1
                            ? t("cartHeader.productSingular")
                            : t("cartHeader.productPlural"),
                      })}
                    </p>
                  </div>

                  <ShoppingBag className="text-[#7c3aed]" />
                </div>

                {safeItems.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f3ff] text-[#7c3aed]">
                      <ShoppingBag size={28} />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900">
                      {t("empty.title")}
                    </h3>
                    <p className="mx-auto mb-8 max-w-xl text-gray-600">
                      {t("empty.description")}
                    </p>
                    <Link
                      href="/tours"
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#22c55e] px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:scale-[1.01]"
                    >
                      <ArrowLeft size={18} />
                      {t("empty.cta")}
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {safeItems.map((item) => {
                      const quantity = item.adults;
                      const lineTotal = item.tour.price * quantity;

                      return (
                        <div
                          key={item.tour.id}
                          className="grid gap-5 p-6 md:grid-cols-[160px_1fr]"
                        >
                          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#f5f3ff] to-[#ecfdf5] shadow-sm">
                            <img
                              src={item.tour.image_url || "/images/placeholder.jpg"}
                              alt={item.tour.title}
                              className="h-40 w-full object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h3 className="text-2xl font-bold leading-tight text-gray-900">
                                  {item.tour.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.tour.destination}
                                  {item.date ? ` · ${item.date}` : ""}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {t("item.adults", { quantity })}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.tour.id)}
                                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-[#E85A5A]"
                                aria-label={t("item.removeAria")}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>

                            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500">
                                  {t("item.quantityLabel")}
                                </p>
                                <div className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(
                                        item.tour.id,
                                        Math.max(1, quantity - 1)
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7c3aed] text-[#7c3aed] transition-colors hover:bg-[#7c3aed] hover:text-white"
                                  >
                                    <Minus size={16} />
                                  </button>

                                  <span className="w-10 text-center text-lg font-bold text-gray-900">
                                    {quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.tour.id, quantity + 1)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7c3aed] text-[#7c3aed] transition-colors hover:bg-[#7c3aed] hover:text-white"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                              </div>

                              <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] px-4 py-3 text-right">
                                <p className="text-sm text-gray-500">{t("item.subtotal")}</p>
                                <p className="text-2xl font-black text-[#7c3aed]">
                                  {formatPrice(lineTotal)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {safeItems.length > 0 && (
                <form
                  onSubmit={handlePayment}
                  className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(34,197,94,0.08)] backdrop-blur-xl md:p-8"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("checkout.title")}
                    </h2>
                    <p className="mt-1 text-gray-600">
                      {t("checkout.description")}
                    </p>
                  </div>

                  {checkoutError && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                      {checkoutError}
                    </div>
                  )}

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.firstName")}
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          required
                          minLength={2}
                          value={form.firstName}
                          onChange={(e) =>
                            setForm({ ...form, firstName: e.target.value })
                          }
                          className={iconInputClass}
                          type="text"
                          placeholder={t("form.placeholders.firstName")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.lastName")}
                      </label>
                      <input
                        required
                        minLength={2}
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        className={inputClass}
                        type="text"
                        placeholder={t("form.placeholders.lastName")}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.email")}
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className={iconInputClass}
                          type="email"
                          placeholder={t("form.placeholders.email")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.phone")}
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          required
                          minLength={7}
                          pattern="[0-9\\s()+-]{7,20}"
                          value={form.telefono}
                          onChange={(e) =>
                            setForm({ ...form, telefono: e.target.value })
                          }
                          className={iconInputClass}
                          type="tel"
                          placeholder={t("form.placeholders.phone")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.city")}
                      </label>
                      <input
                        required
                        minLength={2}
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className={inputClass}
                        type="text"
                        placeholder={t("form.placeholders.city")}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.state")}
                      </label>
                      <input
                        required
                        minLength={2}
                        value={form.state}
                        onChange={(e) =>
                          setForm({ ...form, state: e.target.value })
                        }
                        className={inputClass}
                        type="text"
                        placeholder={t("form.placeholders.state")}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.street")}
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          required
                          minLength={2}
                          value={form.calle}
                          onChange={(e) =>
                            setForm({ ...form, calle: e.target.value })
                          }
                          className={iconInputClass}
                          type="text"
                          placeholder={t("form.placeholders.street")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.number")}
                      </label>
                      <input
                        required
                        minLength={1}
                        value={form.numero}
                        onChange={(e) =>
                          setForm({ ...form, numero: e.target.value })
                        }
                        className={inputClass}
                        type="text"
                        placeholder={t("form.placeholders.number")}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.neighborhood")}
                      </label>
                      <div className="relative">
                        <Building2
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          required
                          minLength={2}
                          value={form.colonia}
                          onChange={(e) =>
                            setForm({ ...form, colonia: e.target.value })
                          }
                          className={iconInputClass}
                          type="text"
                          placeholder={t("form.placeholders.neighborhood")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.postalCode")}
                      </label>
                      <input
                        required
                        minLength={4}
                        maxLength={6}
                        pattern="[0-9]{4,6}"
                        value={form.cp}
                        onChange={(e) =>
                          setForm({ ...form, cp: e.target.value })
                        }
                        className={inputClass}
                        type="text"
                        inputMode="numeric"
                        placeholder={t("form.placeholders.postalCode")}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("form.labels.country")}
                      </label>
                      <input
                        required
                        minLength={2}
                        value={form.country}
                        onChange={(e) =>
                          setForm({ ...form, country: e.target.value })
                        }
                        className={inputClass}
                        type="text"
                        placeholder={t("form.placeholders.country")}
                      />
                    </div>
                  </div>

                  <div className="mt-10 border-t border-gray-100 pt-8">
                    <h3 className="mb-5 text-xl font-bold text-gray-900">
                      {t("payment.title")}
                    </h3>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {t("payment.labels.cardNumber")}
                        </label>
                        <div className="relative">
                          <CreditCard
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            required
                            minLength={13}
                            maxLength={19}
                            inputMode="numeric"
                            value={form.cardNumber}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                cardNumber: sanitizeCardNumber(e.target.value),
                              })
                            }
                            className={iconInputClass}
                            type="text"
                            placeholder={t("payment.placeholders.cardNumber")}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {t("payment.labels.cardName")}
                        </label>
                        <input
                          required
                          minLength={2}
                          value={form.cardName}
                          onChange={(e) =>
                            setForm({ ...form, cardName: e.target.value })
                          }
                          className={inputClass}
                          type="text"
                          placeholder={t("payment.placeholders.cardName")}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {t("payment.labels.month")}
                        </label>
                        <input
                          required
                          minLength={2}
                          maxLength={2}
                          pattern="[0-9]{2}"
                          value={form.expMonth}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              expMonth: e.target.value.replace(/\D/g, "").slice(0, 2),
                            })
                          }
                          className={inputClass}
                          type="text"
                          inputMode="numeric"
                          placeholder={t("payment.placeholders.month")}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {t("payment.labels.year")}
                        </label>
                        <input
                          required
                          minLength={4}
                          maxLength={4}
                          pattern="[0-9]{4}"
                          value={form.expYear}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              expYear: e.target.value.replace(/\D/g, "").slice(0, 4),
                            })
                          }
                          className={inputClass}
                          type="text"
                          inputMode="numeric"
                          placeholder={t("payment.placeholders.year")}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {t("payment.labels.cvv")}
                        </label>
                        <div className="relative">
                          <LockKeyhole
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            required
                            minLength={3}
                            maxLength={4}
                            pattern="[0-9]{3,4}"
                            value={form.cvv}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                              })
                            }
                            className={iconInputClass}
                            type="password"
                            inputMode="numeric"
                            placeholder={t("payment.placeholders.cvv")}
                          />
                        </div>
                      </div>

                      <div className="flex items-end">
                        <p className="text-sm leading-relaxed text-gray-500">
                          {t("payment.note")}
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#22c55e] px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        t("payment.processing")
                      ) : (
                        <>
                          <Banknote size={20} />
                          {t("payment.submit")}
                        </>
                      )}
                    </button>

                    <div className="flex flex-row items-center justify-between gap-6 p-6">
                      <Image
                        src="/etomin.png"
                        alt={"etomin"}
                        width={250}
                        height={30}
                      />
                      <Image
                        src="/cards.png"
                        alt={"cards"}
                        width={220}
                        height={30}
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            <aside className="h-fit space-y-6 lg:sticky lg:top-4">
              <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl">
                <h2 className="mb-5 text-2xl font-bold text-gray-900">
                  {t("summary.title")}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>{t("summary.subtotal")}</span>
                    <span className="font-medium text-gray-700">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>{t("summary.coupon")}</span>
                    <span className="font-medium text-gray-700">
                      {coupon
                        ? t("summary.couponApplied", {
                          code: coupon.code,
                          discount: coupon.discount,
                        })
                        : t("summary.noCoupon")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>{t("summary.discount")}</span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span className="text-lg font-semibold text-gray-900">
                      {t("summary.total")}
                    </span>
                    <span className="text-3xl font-black text-[#7c3aed]">
                      {formatPrice(total)}
                    </span>
                  </div>

                </div>

                <div className="mt-6 rounded-3xl border border-[#dbeafe] bg-gradient-to-br from-[#f5f3ff] to-[#ecfdf5] p-5">
                  <div className="mb-3 flex items-center gap-2 font-semibold text-[#7c3aed]">
                    <BadgePercent size={16} />
                    {t("coupon.title")}
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition-colors placeholder:text-gray-400 focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/10"
                      type="text"
                      placeholder={t("coupon.placeholder")}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#22c55e] px-4 py-3 font-semibold text-white shadow-sm transition-all hover:scale-[1.01]"
                    >
                      {t("coupon.apply")}
                    </button>
                  </div>

                  {couponMessage && (
                    <p className="mt-3 text-sm text-gray-600">{couponMessage}</p>
                  )}
                </div>

                <div className="mt-6 space-y-3 rounded-3xl border border-gray-100 bg-white p-5">
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <ReceiptText size={16} className="text-[#7c3aed]" />
                    {t("info.emailConfirmation")}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck size={16} className="text-[#16a34a]" />
                    {t("info.processedInFlow")}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#7c3aed]" />
                    {t("info.noRedirects")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}