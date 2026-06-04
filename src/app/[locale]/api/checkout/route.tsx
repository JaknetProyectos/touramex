// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS_EMAIL = "hola@touramex.com";

interface CartTour {
  id: string;
  slug: string;
  title: string;
  title_english: string | null;
  description: string | null;
  description_english: string | null;
  price: number;
  image_url: string | null;
  destination: string;
  duration: string | null;
}

interface CartItem {
  tour: CartTour;
  adults: number;
  date?: string;
}

interface CheckoutBody {
  orderId: string;
  amount: number;
  total: string;
  couponCode?: string | null;
  discountPercent?: number;

  paymentResult?: {
    authorization?: string;
    responseCode?: string;
    status?: string;
  };

  items: CartItem[];

  customer: {
    nombre: string;
    firstName: string;
    lastName: string;
    email: string;
    telefono: string;

    city?: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    direccion?: string;
    state?: string;
    cp?: string;
    country?: string;
  };
}

function currency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

function renderItems(items: CartItem[]) {
  return items
    .map((item) => {
      const image =
        item.tour?.image_url ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";

      const title = item.tour?.title || "Experiencia";
      const destination = item.tour?.destination || "México";
      const duration = item.tour?.duration || "Experiencia personalizada";

      const quantity = item.adults || 1;

      const total = (item.tour?.price || 0) * quantity;

      return `
        <div style="margin-bottom:20px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;">
          
          <img
            src="${image}"
            alt="${title}"
            style="
              width:100%;
              height:220px;
              object-fit:cover;
              display:block;
            "
          />

          <div style="padding:24px;">
            
            <div style="
              display:inline-block;
              padding:8px 14px;
              background:#ecfeff;
              color:#0f766e;
              border-radius:999px;
              font-size:12px;
              font-weight:700;
              margin-bottom:16px;
            ">
              ${destination}
            </div>

            <h3 style="
              margin:0;
              font-size:24px;
              line-height:1.3;
              color:#111827;
              font-weight:800;
            ">
              ${title}
            </h3>

            <div style="
              margin-top:16px;
              padding-top:16px;
              border-top:1px solid #f3f4f6;
            ">
              
              <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:10px;
                gap:10px;
              ">
                <span style="color:#6b7280;font-size:14px;">
                  Personas 
                </span>

                <strong style="color:#111827;font-size:14px;">
                  ${quantity}
                </strong>
              </div>

              ${
                item.date
                  ? `
                <div style="
                  display:flex;
                  justify-content:space-between;
                  margin-bottom:10px;
                  gap:10px;
                ">
                  <span style="color:#6b7280;font-size:14px;">
                    Fecha  
                  </span>

                  <strong style="
                    color:#111827;
                    font-size:14px;
                    text-align:right;
                  ">
                    ${item.date}
                  </strong>
                </div>
              `
                  : ""
              }

              <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:10px;
                gap:10px;
              ">
                <span style="color:#6b7280;font-size:14px;">
                  Duración  
                </span>

                <strong style="
                  color:#111827;
                  font-size:14px;
                  text-align:right;
                ">
                  ${duration}
                </strong>
              </div>

              <div style="
                display:flex;
                justify-content:space-between;
                margin-top:18px;
                padding-top:18px;
                border-top:1px solid #f3f4f6;
                gap:10px;
              ">
                <span style="
                  color:#6b7280;
                  font-size:15px;
                ">
                  Total  
                </span>

                <strong style="
                  color:#7c3aed;
                  font-size:22px;
                ">
                  ${currency(total)}
                </strong>
              </div>

            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function customerEmailTemplate(data: CheckoutBody) {
  const customerName =
    data.customer?.firstName || data.customer?.nombre || "Viajero";

  return `
  <div style="
    margin:0;
    padding:40px 16px;
    background:#f4f7fb;
    font-family:Arial,sans-serif;
  ">

    <div style="
      max-width:760px;
      margin:0 auto;
      background:#ffffff;
      border-radius:32px;
      overflow:hidden;
      box-shadow:0 25px 60px rgba(0,0,0,0.10);
    ">

      <!-- HERO -->
      <div style="
        position:relative;
        background-image:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop');
        background-size:cover;
        background-position:center;
      ">

        <div style="
          background:linear-gradient(
            135deg,
            rgba(76,29,149,0.88),
            rgba(16,185,129,0.78)
          );
          padding:60px 28px;
        ">

          <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            gap:14px;
            margin-bottom:30px;
          ">
            <img
              src="https://touramex.com/logo.png"
              alt="Touramex"
              width="52"
              height="52"
              style="
                border-radius:14px;
                background:white;
                padding:6px;
              "
            />

            <div>
              <h1 style="
                margin:0;
                color:white;
                font-size:30px;
                font-weight:900;
                line-height:1;
              ">
                Touramex
              </h1>

              <p style="
                margin:8px;
                color:rgba(255,255,255,0.85);
                font-size:14px;
              ">
                Confirmación de compra
              </p>
            </div>
          </div>

          <div style="
            background:rgba(255,255,255,0.12);
            border:1px solid rgba(255,255,255,0.16);
            border-radius:28px;
            padding:30px;
            backdrop-filter:blur(10px);
          ">

            <p style="
              margin:0 0 12px 0;
              color:#d1fae5;
              font-size:13px;
              font-weight:700;
              letter-spacing:2px;
              text-transform:uppercase;
            ">
              Reserva confirmada
            </p>

            <h2 style="
              margin:0;
              color:white;
              font-size:42px;
              line-height:1.15;
              font-weight:900;
            ">
              Hola ${customerName}
            </h2>

            <p style="
              margin:18px 0 0 0;
              color:rgba(255,255,255,0.92);
              font-size:16px;
              line-height:1.8;
            ">
              Tu experiencia ha sido reservada correctamente.
              Nuestro equipo ya recibió tu compra y muy pronto
              compartiremos contigo toda la información necesaria
              para tu viaje.
            </p>

          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div style="padding:34px 22px;">

        <!-- ORDER -->
        <div style="
          background:#f9fafb;
          border-radius:24px;
          padding:24px;
          border:1px solid #eef2f7;
          margin-bottom:28px;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            gap:20px;
            flex-wrap:wrap;
          ">

            <div style="text-align:right;">
              <p style="
                margin:0 0 8px 0;
                color:#6b7280;
                font-size:13px;
                text-transform:uppercase;
                letter-spacing:1px;
                font-weight:700;
              ">
                Total pagado
              </p>

              <h3 style="
                margin:0;
                color:#7c3aed;
                font-size:32px;
                font-weight:900;
              ">
                ${data.total}
              </h3>
            </div>

          </div>

        </div>

        <!-- ITEMS -->
        ${renderItems(data.items)}

        <!-- CUSTOMER -->
        <div style="
          margin-top:28px;
          background:#ffffff;
          border:1px solid #e5e7eb;
          border-radius:24px;
          padding:26px;
        ">

          <h3 style="
            margin:0 0 24px 0;
            color:#111827;
            font-size:24px;
            font-weight:800;
          ">
            Información del viajero
          </h3>

          <div style="margin-bottom:14px;">
            <div style="color:#6b7280;font-size:13px;margin-bottom:4px;">
              Nombre
            </div>

            <div style="color:#111827;font-weight:700;">
              ${data.customer.nombre}
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="color:#6b7280;font-size:13px;margin-bottom:4px;">
              Email
            </div>

            <div style="color:#111827;font-weight:700;">
              ${data.customer.email}
            </div>
          </div>

          ${
            data.customer.telefono
              ? `
            <div style="margin-bottom:14px;">
              <div style="color:#6b7280;font-size:13px;margin-bottom:4px;">
                Teléfono
              </div>

              <div style="color:#111827;font-weight:700;">
                ${data.customer.telefono}
              </div>
            </div>
          `
              : ""
          }

          ${
            data.customer.direccion
              ? `
            <div>
              <div style="color:#6b7280;font-size:13px;margin-bottom:4px;">
                Dirección
              </div>

              <div style="
                color:#111827;
                font-weight:700;
                line-height:1.7;
              ">
                ${data.customer.direccion}
              </div>
            </div>
          `
              : ""
          }

        </div>

        <!-- SUMMARY -->
        <div style="
          margin-top:28px;
          background:linear-gradient(
            135deg,
            #4c1d95,
            #6d28d9
          );
          border-radius:28px;
          padding:28px;
          color:white;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            margin-bottom:14px;
          ">
            <span style="opacity:0.8;">
              Monto procesado
            </span>

            <strong>
              ${currency(data.amount)}
            </strong>
          </div>

          ${
            data.couponCode
              ? `
            <div style="
              display:flex;
              justify-content:space-between;
              margin-bottom:14px;
            ">
              <span style="opacity:0.8;">
                Cupón aplicado
              </span>

              <strong>
                ${data.couponCode}
              </strong>
            </div>
          `
              : ""
          }

          ${
            data.discountPercent as number > 0
              ? `
            <div style="
              display:flex;
              justify-content:space-between;
              margin-bottom:14px;
            ">
              <span style="opacity:0.8;">
                Descuento
              </span>

              <strong>
                ${data.discountPercent}%
              </strong>
            </div>
          `
              : ""
          }

          <div style="
            margin-top:22px;
            padding-top:22px;
            border-top:1px solid rgba(255,255,255,0.15);
            display:flex;
            justify-content:space-between;
            align-items:center;
          ">
            <span style="
              font-size:16px;
              font-weight:700;
            ">
              Total final  
            </span>

            <span style="
              font-size:34px;
              font-weight:900;
            ">
              ${data.total}
            </span>
          </div>

        </div>

        <!-- FOOT -->
        <div style="
          margin-top:34px;
          text-align:center;
        ">

          <p style="
            margin:0;
            color:#6b7280;
            font-size:14px;
            line-height:1.8;
          ">
            Gracias por confiar en Touramex.
            Estamos emocionados de formar parte de tu próxima aventura.
          </p>

        </div>

      </div>
    </div>
  </div>
  `;
}

function businessEmailTemplate(data: CheckoutBody) {
  return `
  <div style="
    background:#f4f7fb;
    padding:40px 16px;
    font-family:Arial,sans-serif;
  ">

    <div style="
      max-width:760px;
      margin:0 auto;
      background:#ffffff;
      border-radius:30px;
      overflow:hidden;
      border:1px solid #e5e7eb;
    ">

      <div style="
        background-image:url('https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1800&auto=format&fit=crop');
        background-size:cover;
        background-position:center;
      ">

        <div style="
          background:linear-gradient(
            135deg,
            rgba(17,24,39,0.88),
            rgba(76,29,149,0.82)
          );
          padding:40px 30px;
        ">

          <h1 style="
            margin:0;
            color:white;
            font-size:36px;
            font-weight:900;
          ">
            Nueva compra recibida
          </h1>

          <p style="
            margin:12px 0 0 0;
            color:rgba(255,255,255,0.82);
          ">
            ${data.orderId}
          </p>

        </div>
      </div>

      <div style="padding:30px;">

        <h2 style="
          margin-top:0;
          color:#111827;
          font-size:24px;
        ">
          Cliente
        </h2>

        <div style="
          background:#f9fafb;
          border-radius:22px;
          padding:24px;
          margin-bottom:30px;
        ">

          <p><strong>Nombre:</strong> ${data.customer.nombre}</p>
          <p><strong>Email:</strong> ${data.customer.email}</p>
          <p><strong>Teléfono:</strong> ${data.customer.telefono}</p>

          ${
            data.customer.direccion
              ? `
            <p>
              <strong>Dirección:</strong>
              ${data.customer.direccion}
            </p>
          `
              : ""
          }

        </div>

        <h2 style="
          color:#111827;
          font-size:24px;
        ">
          Experiencias compradas
        </h2>

        ${renderItems(data.items)}

        <div style="
          margin-top:30px;
          background:#111827;
          color:white;
          border-radius:24px;
          padding:30px;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            margin-bottom:12px;
          ">
            <span style="opacity:0.7;">
              Total procesado
            </span>

            <strong>
              ${data.total}
            </strong>
          </div>

          ${
            data.paymentResult?.authorization
              ? `
            <div style="
              display:flex;
              justify-content:space-between;
              margin-bottom:12px;
            ">
              <span style="opacity:0.7;">
                Autorización
              </span>

              <strong>
                ${data.paymentResult.authorization}
              </strong>
            </div>
          `
              : ""
          }

          <div style="
            display:flex;
            justify-content:space-between;
          ">
            <span style="opacity:0.7;">
              Estado
            </span>

            <strong>
              ${data.paymentResult?.status || "APPROVED"}
            </strong>
          </div>

        </div>

      </div>
    </div>
  </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();

    if (!body.customer?.email) {
      return NextResponse.json(
        {
          error: "Email requerido",
        },
        {
          status: 400,
        }
      );
    }

    await resend.emails.send({
      from: `Touramex <${BUSINESS_EMAIL}>`,
      to: [body.customer.email],
      subject: `Tu compra está confirmada · ${body.orderId}`,
      html: customerEmailTemplate(body),
    });

    await resend.emails.send({
      from: `Touramex <${BUSINESS_EMAIL}>`,
      to: [BUSINESS_EMAIL],
      subject: `Nueva compra recibida · ${body.orderId}`,
      html: businessEmailTemplate(body),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error enviando correos",
      },
      {
        status: 500,
      }
    );
  }
}