"use client";

import { useAlert } from "@/context/AlertContext";

export default function AlertsTestPage() {
  const { showAlert } = useAlert();

  return (
    <main className="min-h-screen bg-[#f6f9ff] px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">
            Prueba de alertas
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Página para validar visualmente el AlertContext.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              showAlert({
                type: "success",
                title: "Pago exitoso",
                message:
                  "Tu compra fue procesada correctamente y el correo fue enviado.",
              })
            }
            className="rounded-2xl bg-green-500 px-5 py-4 font-semibold text-white transition-colors hover:bg-green-600"
          >
            Mostrar Success
          </button>

          <button
            type="button"
            onClick={() =>
              showAlert({
                type: "error",
                title: "Error al procesar pago",
                message:
                  "La transacción fue rechazada por el banco emisor.",
              })
            }
            className="rounded-2xl bg-red-500 px-5 py-4 font-semibold text-white transition-colors hover:bg-red-600"
          >
            Mostrar Error
          </button>

          <button
            type="button"
            onClick={() =>
              showAlert({
                type: "warning",
                title: "Campos incompletos",
                message:
                  "Completa todos los campos obligatorios antes de continuar.",
              })
            }
            className="rounded-2xl bg-yellow-500 px-5 py-4 font-semibold text-white transition-colors hover:bg-yellow-600"
          >
            Mostrar Warning
          </button>

          <button
            type="button"
            onClick={() =>
              showAlert({
                type: "info",
                title: "Información",
                message:
                  "El sistema enviará una confirmación por correo electrónico.",
              })
            }
            className="rounded-2xl bg-[#4f8bf4] px-5 py-4 font-semibold text-white transition-colors hover:bg-[#3a7ae5]"
          >
            Mostrar Info
          </button>
        </div>

        <div className="mt-10 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-6">
          <p className="text-sm leading-relaxed text-gray-600">
            Guarda este archivo por ejemplo como:
          </p>

          <code className="mt-3 block rounded-xl bg-black px-4 py-3 text-sm text-green-400">
            app/test-alerts/page.tsx
          </code>
        </div>
      </div>
    </main>
  );
}