import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Touramex | Viajes y Tours en México",
  description: "Bienvenido a Touramex, donde la comodidad se fusiona con la aventura. El servicio personalizado y la atención al detalle garantizan una experiencia excepcional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No definimos lang aquí porque lo hará el layout dinámico
    <html suppressHydrationWarning>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}