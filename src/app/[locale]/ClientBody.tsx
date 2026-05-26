"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { AlertProvider } from "@/context/AlertContext";
import { LocaleProvider } from "@/context/LangContext";


export function ClientBody({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <AlertProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AlertProvider>
    </LocaleProvider>
  );
}
