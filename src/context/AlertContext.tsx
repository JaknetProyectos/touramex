"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  X,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";

export type AlertType = "error" | "success" | "warning" | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const typeStyles = {
  success: {
    bg: "bg-green-100",
    text: "text-green-600",
    button: "bg-green-500 hover:bg-green-600",
    icon: <CheckCircle2 className="h-7 w-7" />,
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-600",
    button: "bg-red-500 hover:bg-red-600",
    icon: <AlertCircle className="h-7 w-7" />,
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    button: "bg-yellow-500 hover:bg-yellow-600",
    icon: <AlertTriangle className="h-7 w-7" />,
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    button: "bg-[#4f8bf4] hover:bg-[#3a7ae5]",
    icon: <Info className="h-7 w-7" />,
  },
} as const;

export function AlertProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);

    const onClose = options?.onClose;
    setOptions(null);

    onClose?.();
  }, [options]);

  const type = options?.type ?? "info";
  const styles = typeStyles[type];

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {mounted &&
        isOpen &&
        options &&
        createPortal(
          <div className="fixed inset-0 z-50">
            {/* OVERLAY */}
            <div
              onClick={hideAlert}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* CENTER */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl">
                <button
                  type="button"
                  onClick={hideAlert}
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="p-8">
                  <div
                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${styles.bg} ${styles.text}`}
                  >
                    {options.icon ?? styles.icon}
                  </div>

                  <div className="text-center">
                    <h3 className="mb-3 text-2xl font-bold text-gray-900">
                      {options.title}
                    </h3>

                    <p className="leading-relaxed text-gray-600">
                      {options.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={hideAlert}
                    className={`mt-8 w-full rounded-2xl px-5 py-4 font-semibold text-white transition-colors ${styles.button}`}
                  >
                    {options.confirmText || "Continuar"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert debe usarse dentro de AlertProvider");
  }

  return context;
};