"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useContact } from "@/hooks/useContact";

import { useTranslations } from "next-intl";

import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");

  const { sendContactForm, isLoading } = useContact();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    servicioDeseado: "",
    presupuesto: "",
    asunto: t("form.subjectDefault"),
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const result = await sendContactForm({
      nombre: formData.nombre,
      email: formData.email,
      telefono:
        formData.telefono || undefined,
      mensaje: formData.mensaje,
      servicioDeseado:
        formData.servicioDeseado ||
        undefined,
      presupuesto:
        formData.presupuesto || undefined,
      asunto: formData.asunto,
    });

    if (result.success) {
      setSubmitted(true);

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
        servicioDeseado: "",
        presupuesto: "",
        asunto: t("form.subjectDefault"),
      });
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Header />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop"
            alt={t("hero.imageAlt")}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#050816]/80" />

          <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-sm text-white/80">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
              {t("hero.title")}
              <span className="bg-gradient-to-r from-violet-300 via-white to-emerald-300 bg-clip-text text-transparent">
                {" "}
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-20">
        {/* Decorative Blurs */}
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-8 lg:grid-cols-[420px_1fr]">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Intro Card */}
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
                <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-300">
                  {t("info.badge")}
                </p>

                <h2 className="mb-4 text-3xl font-bold">
                  {t("info.title")}
                </h2>

                <p className="leading-relaxed text-white/70">
                  {t("info.description")}
                </p>
              </div>

              {/* Address */}
              <div className="group rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all hover:border-violet-400/30 hover:bg-white/[0.07]">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {t("cards.address.title")}
                    </h3>

                    <p className="text-sm leading-relaxed text-white/70">
                      {t("cards.address.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all hover:border-emerald-400/30 hover:bg-white/[0.07]">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
                    <Mail size={24} />
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {t("cards.email.title")}
                    </h3>

                    <a
                      href="mailto:hola@touramex.com"
                      className="transition-colors hover:text-white text-white/70"
                    >
                      hola@touramex.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all hover:border-cyan-400/30 hover:bg-white/[0.07]">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                    <Phone size={24} />
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {t("cards.phone.title")}
                    </h3>

                    <a
                      href="tel:5552059560"
                      className="transition-colors hover:text-white text-white/70"
                    >
                      55 5205 9560
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
              {/* Glow */}
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative p-8 md:p-10">
                <div className="mb-8">
                  <p className="mb-3 text-sm uppercase tracking-[0.25em] text-emerald-300">
                    {t("form.badge")}
                  </p>

                  <h2 className="mb-4 text-4xl font-black">
                    {t("form.title")}
                  </h2>

                  <p className="text-lg leading-relaxed text-white/70">
                    {t("form.description")}
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-500/10 p-10 text-center backdrop-blur-xl">
                    <div className="mb-5 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                        <CheckCircle2
                          size={42}
                          className="text-emerald-400"
                        />
                      </div>
                    </div>

                    <h3 className="mb-4 text-3xl font-bold">
                      {t("success.title")}
                    </h3>

                    <p className="mb-8 text-white/70">
                      {t("success.description")}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSubmitted(false)
                      }
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition-all hover:scale-[1.02]"
                    >
                      {t("success.button")}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 md:grid-cols-1">
                      <div>
                        <label
                          htmlFor="nombre"
                          className="mb-2 block text-sm font-medium text-white/80"
                        >
                          {t("form.fields.name.label")}
                        </label>

                        <input
                          type="text"
                          id="nombre"
                          required
                          value={
                            formData.nombre
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nombre:
                                e.target.value,
                            })
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-violet-400 focus:bg-white/[0.08]"
                          placeholder={t(
                            "form.fields.name.placeholder"
                          )}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-white/80"
                        >
                          {t("form.fields.email.label")}
                        </label>

                        <input
                          type="email"
                          id="email"
                          required
                          value={
                            formData.email
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email:
                                e.target.value,
                            })
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-violet-400 focus:bg-white/[0.08]"
                          placeholder={t(
                            "form.fields.email.placeholder"
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="telefono"
                          className="mb-2 block text-sm font-medium text-white/80"
                        >
                          {t("form.fields.phone.label")}
                        </label>

                        <input
                          type="tel"
                          id="telefono"
                          value={
                            formData.telefono
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              telefono:
                                e.target.value,
                            })
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-violet-400 focus:bg-white/[0.08]"
                          placeholder={t(
                            "form.fields.phone.placeholder"
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mensaje"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        {t("form.fields.message.label")}
                      </label>

                      <textarea
                        id="mensaje"
                        required
                        rows={6}
                        value={
                          formData.mensaje
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mensaje:
                              e.target.value,
                          })
                        }
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-violet-400 focus:bg-white/[0.08]"
                        placeholder={t(
                          "form.fields.message.placeholder"
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-violet-500/30 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? (
                        t("form.loading")
                      ) : (
                        <>
                          <Send
                            size={20}
                            className="transition-transform group-hover:translate-x-1"
                          />

                          {t("form.submit")}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}