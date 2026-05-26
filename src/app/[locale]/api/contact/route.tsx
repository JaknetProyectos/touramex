import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const WEBSITE_URL = "https://Touramex.com.mx";
const LOGO_URL = `${WEBSITE_URL}/logo.png`;

const BEACH_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      mensaje,
      servicioDeseado,
      presupuesto,
      asunto,
    } = body;

    // =========================
    // EMAIL CLIENTE
    // =========================

    await resend.emails.send({
      from: "Touramex <gestion@softvora.com.mx>",
      to: [email],
      subject: "Recibimos tu solicitud ✨",
      html: `
      <div style="
        margin:0;
        padding:40px 20px;
        background:#f5f7ff;
        font-family:Inter,Arial,sans-serif;
        color:#111827;
      ">

        <div style="
          max-width:760px;
          margin:auto;
        ">

          <!-- MAIN CARD -->
          <div style="
            background:#ffffff;
            border-radius:32px;
            overflow:hidden;
            box-shadow:
              0 25px 80px rgba(124,58,237,.12),
              0 10px 30px rgba(16,185,129,.10);
            border:1px solid #ede9fe;
          ">

            <!-- HERO -->
            <div style="
              position:relative;
              padding:60px 40px;
              background-image:url('${BEACH_IMAGE}');
              background-size:cover;
              background-position:center;
            ">

              <div style="
                position:absolute;
                inset:0;
                background:
                  linear-gradient(
                    135deg,
                    rgba(91,33,182,.88),
                    rgba(16,185,129,.72)
                  );
              "></div>

              <div style="
                position:relative;
                z-index:2;
              ">

                <!-- LOGO -->
                <div style="
                  display:flex;
                  align-items:center;
                  gap:14px;
                  margin-bottom:40px;
                ">
                  <div style="
                    width:58px;
                    height:58px;
                    border-radius:18px;
                    background:rgba(255,255,255,.16);
                    backdrop-filter:blur(12px);
                    border:1px solid rgba(255,255,255,.22);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                  ">
                    <img
                      src="${LOGO_URL}"
                      alt="Touramex"
                      width="34"
                      height="34"
                      style="display:block;"
                    />
                  </div>

                  <div>
                    <p style="
                      margin:0;
                      font-size:24px;
                      font-weight:800;
                      color:#ffffff;
                      letter-spacing:-0.03em;
                    ">
                      Touramex
                    </p>

                    <p style="
                      margin:4px 0 0 0;
                      color:rgba(255,255,255,.82);
                      font-size:14px;
                    ">
                      Experiencias de alta calidad
                    </p>
                  </div>
                </div>

                <!-- TEXT -->
                <p style="
                  margin:0 0 14px 0;
                  color:#ddd6fe;
                  font-size:14px;
                  font-weight:700;
                  letter-spacing:.12em;
                  text-transform:uppercase;
                ">
                  Solicitud recibida
                </p>

                <h1 style="
                  margin:0;
                  font-size:44px;
                  line-height:1.05;
                  font-weight:900;
                  color:white;
                  letter-spacing:-0.05em;
                  max-width:520px;
                ">
                  Gracias por escribirnos,
                  ${nombre}
                </h1>

                <p style="
                  margin:24px 0 0 0;
                  max-width:520px;
                  color:rgba(255,255,255,.92);
                  font-size:17px;
                  line-height:1.8;
                ">
                  Nuestro equipo ya recibió tu mensaje.
                  Estamos revisando tu solicitud para darte
                  una respuesta clara, personalizada y rápida.
                </p>

              </div>
            </div>

            <!-- BODY -->
            <div style="
              padding:40px;
            ">

              <!-- GLASS INFO -->
              <div style="
                background:
                  linear-gradient(
                    135deg,
                    rgba(124,58,237,.06),
                    rgba(16,185,129,.06)
                  );
                border:1px solid #e9d5ff;
                border-radius:24px;
                padding:28px;
              ">

                <p style="
                  margin:0 0 10px 0;
                  color:#8b5cf6;
                  font-size:13px;
                  font-weight:700;
                  text-transform:uppercase;
                  letter-spacing:.08em;
                ">
                  Asunto
                </p>

                <h2 style="
                  margin:0;
                  color:#111827;
                  font-size:28px;
                  line-height:1.2;
                  font-weight:800;
                  letter-spacing:-0.03em;
                ">
                  ${asunto}
                </h2>

              </div>

              ${
                servicioDeseado
                  ? `
                <div style="
                  margin-top:22px;
                  padding:24px;
                  border-radius:22px;
                  background:#fafaff;
                  border:1px solid #ede9fe;
                ">
                  <p style="
                    margin:0 0 10px 0;
                    color:#8b5cf6;
                    font-size:13px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:.08em;
                  ">
                    Servicio solicitado
                  </p>

                  <p style="
                    margin:0;
                    color:#111827;
                    font-size:18px;
                    line-height:1.7;
                    font-weight:600;
                  ">
                    ${servicioDeseado}
                  </p>
                </div>
              `
                  : ""
              }

              ${
                presupuesto
                  ? `
                <div style="
                  margin-top:22px;
                  padding:24px;
                  border-radius:22px;
                  background:#f0fdf4;
                  border:1px solid #bbf7d0;
                ">
                  <p style="
                    margin:0 0 10px 0;
                    color:#10b981;
                    font-size:13px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:.08em;
                  ">
                    Presupuesto estimado
                  </p>

                  <p style="
                    margin:0;
                    color:#065f46;
                    font-size:26px;
                    font-weight:900;
                    letter-spacing:-0.03em;
                  ">
                    ${presupuesto}
                  </p>
                </div>
              `
                  : ""
              }

              ${
                mensaje
                  ? `
                <div style="
                  margin-top:22px;
                  padding:28px;
                  border-radius:24px;
                  background:white;
                  border:1px solid #e5e7eb;
                ">

                  <p style="
                    margin:0 0 14px 0;
                    color:#6d28d9;
                    font-size:13px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:.08em;
                  ">
                    Tu mensaje
                  </p>

                  <p style="
                    margin:0;
                    color:#4b5563;
                    line-height:1.9;
                    font-size:16px;
                    white-space:pre-line;
                  ">
                    ${mensaje}
                  </p>

                </div>
              `
                  : ""
              }

              <!-- CTA -->
              <div style="
                margin-top:42px;
                text-align:center;
              ">

                <a
                  href="${WEBSITE_URL}"
                  style="
                    display:inline-block;
                    padding:18px 34px;
                    border-radius:18px;
                    background:
                      linear-gradient(
                        135deg,
                        #7c3aed,
                        #10b981
                      );
                    color:white;
                    text-decoration:none;
                    font-weight:800;
                    font-size:15px;
                    letter-spacing:-0.01em;
                    box-shadow:
                      0 15px 35px rgba(124,58,237,.25);
                  "
                >
                  Explorar touramex.com.mx
                </a>

              </div>

            </div>

            <!-- FOOTER -->
            <div style="
              padding:26px 40px;
              border-top:1px solid #f3f4f6;
              background:#fafafa;
            ">

              <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:16px;
                flex-wrap:wrap;
              ">

                <div style="
                  display:flex;
                  align-items:center;
                  gap:10px;
                ">
                  <img
                    src="${LOGO_URL}"
                    alt="Touramex"
                    width="24"
                    height="24"
                  />

                  <span style="
                    color:#6b7280;
                    font-size:14px;
                  ">
                    © ${new Date().getFullYear()} Touramex 
                  </span>
                </div>

                <span style="
                  color:#9ca3af;
                  font-size:13px;
                ">
                  Diseño y tecnología con identidad
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
      `,
    });

    // =========================
    // EMAIL NEGOCIO
    // =========================

    await resend.emails.send({
      from: "Formulario Web <gestion@Touramex.com.mx>",
      to: ["ventas@Touramex.com.mx"],
      subject: `Nuevo lead recibido · ${asunto}`,
      html: `
      <div style="
        margin:0;
        padding:40px 20px;
        background:#f5f7ff;
        font-family:Inter,Arial,sans-serif;
      ">

        <div style="
          max-width:860px;
          margin:auto;
          background:white;
          border-radius:30px;
          overflow:hidden;
          border:1px solid #ede9fe;
          box-shadow:
            0 20px 60px rgba(124,58,237,.10);
        ">

          <!-- HEADER -->
          <div style="
            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #10b981
              );
            padding:34px 40px;
          ">

            <div style="
              display:flex;
              align-items:center;
              gap:14px;
            ">
              <div style="
                width:56px;
                height:56px;
                border-radius:18px;
                background:rgba(255,255,255,.16);
                display:flex;
                align-items:center;
                justify-content:center;
                border:1px solid rgba(255,255,255,.2);
              ">
                <img
                  src="${LOGO_URL}"
                  width="32"
                  height="32"
                  alt="Touramex"
                />
              </div>

              <div>
                <h1 style="
                  margin:0;
                  color:white;
                  font-size:32px;
                  font-weight:900;
                  letter-spacing:-0.04em;
                ">
                  Nuevo contacto web
                </h1>

                <p style="
                  margin:6px 0 0 0;
                  color:rgba(255,255,255,.82);
                  font-size:14px;
                ">
                  Touramex.com.mx
                </p>
              </div>
            </div>

          </div>

          <!-- CONTENT -->
          <div style="
            padding:40px;
          ">

            <div style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:18px;
            ">

              <div style="
                padding:22px;
                border-radius:22px;
                background:#fafaff;
                border:1px solid #ede9fe;
              ">
                <p style="
                  margin:0 0 8px 0;
                  color:#8b5cf6;
                  font-size:12px;
                  font-weight:700;
                  text-transform:uppercase;
                  letter-spacing:.08em;
                ">
                  Cliente
                </p>

                <p style="
                  margin:0;
                  color:#111827;
                  font-size:22px;
                  font-weight:800;
                ">
                  ${nombre}
                </p>
              </div>

              <div style="
                padding:22px;
                border-radius:22px;
                background:#f0fdf4;
                border:1px solid #bbf7d0;
              ">
                <p style="
                  margin:0 0 8px 0;
                  color:#10b981;
                  font-size:12px;
                  font-weight:700;
                  text-transform:uppercase;
                  letter-spacing:.08em;
                ">
                  Asunto
                </p>

                <p style="
                  margin:0;
                  color:#065f46;
                  font-size:20px;
                  font-weight:800;
                ">
                  ${asunto}
                </p>
              </div>

            </div>

            <div style="
              margin-top:24px;
              padding:28px;
              border-radius:24px;
              border:1px solid #e5e7eb;
              background:white;
            ">

              <h2 style="
                margin-top:0;
                margin-bottom:24px;
                font-size:22px;
                color:#111827;
                font-weight:800;
              ">
                Información del cliente
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse:collapse;"
              >

                <tr>
                  <td style="
                    padding:14px 0;
                    border-bottom:1px solid #f3f4f6;
                    color:#6b7280;
                    width:180px;
                  ">
                    Correo
                  </td>

                  <td style="
                    padding:14px 0;
                    border-bottom:1px solid #f3f4f6;
                    color:#111827;
                    font-weight:600;
                  ">
                    ${email}
                  </td>
                </tr>

                ${
                  telefono
                    ? `
                  <tr>
                    <td style="
                      padding:14px 0;
                      border-bottom:1px solid #f3f4f6;
                      color:#6b7280;
                    ">
                      Teléfono
                    </td>

                    <td style="
                      padding:14px 0;
                      border-bottom:1px solid #f3f4f6;
                      color:#111827;
                      font-weight:600;
                    ">
                      ${telefono}
                    </td>
                  </tr>
                `
                    : ""
                }

                ${
                  servicioDeseado
                    ? `
                  <tr>
                    <td style="
                      padding:14px 0;
                      border-bottom:1px solid #f3f4f6;
                      color:#6b7280;
                    ">
                      Servicio
                    </td>

                    <td style="
                      padding:14px 0;
                      border-bottom:1px solid #f3f4f6;
                      color:#111827;
                      font-weight:600;
                    ">
                      ${servicioDeseado}
                    </td>
                  </tr>
                `
                    : ""
                }

                ${
                  presupuesto
                    ? `
                  <tr>
                    <td style="
                      padding:14px 0;
                      color:#6b7280;
                    ">
                      Presupuesto
                    </td>

                    <td style="
                      padding:14px 0;
                      color:#10b981;
                      font-size:20px;
                      font-weight:900;
                    ">
                      ${presupuesto}
                    </td>
                  </tr>
                `
                    : ""
                }

              </table>

            </div>

            <div style="
              margin-top:24px;
              padding:28px;
              border-radius:24px;
              background:
                linear-gradient(
                  135deg,
                  rgba(124,58,237,.05),
                  rgba(16,185,129,.05)
                );
              border:1px solid #ede9fe;
            ">

              <p style="
                margin:0 0 14px 0;
                color:#8b5cf6;
                font-size:13px;
                font-weight:700;
                text-transform:uppercase;
                letter-spacing:.08em;
              ">
                Mensaje recibido
              </p>

              <p style="
                margin:0;
                color:#374151;
                line-height:1.9;
                font-size:16px;
                white-space:pre-line;
              ">
                ${mensaje}
              </p>

            </div>

          </div>

          <!-- FOOTER -->
          <div style="
            padding:24px 40px;
            border-top:1px solid #f3f4f6;
            background:#fafafa;
            color:#9ca3af;
            font-size:13px;
            text-align:center;
          ">
            Sistema automático de captación · Touramex
          </div>

        </div>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Correos enviados correctamente",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error enviando correos",
      },
      {
        status: 500,
      }
    );
  }
}