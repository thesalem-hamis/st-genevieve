/**
 * DONATION THANK-YOU EMAIL (static / dummy for now)
 * ---------------------------------------------------------------
 * For the backend: this file has NO React or browser dependencies,
 * so it can be copied as-is into a Supabase Edge Function or any
 * Node/Deno server.
 *
 * Flow:
 *   Paystack webhook (charge.success)
 *     -> verify signature + amount/currency
 *     -> save donation (unique by `reference`)
 *     -> if the row was NEWLY inserted, call sendDonationThankYouEmail()
 *
 * Rules:
 *   1. Send from the SERVER only (webhook), never from the browser.
 *      The browser "success" callback is not proof of payment.
 *   2. Only send when the donation is new, so a retried webhook
 *      doesn't email the donor twice.
 *   3. Wrap the send in try/catch. An email failure must NEVER stop
 *      the webhook from returning 200 to Paystack.
 *   4. The donor's email is in `data.customer.email` on the webhook.
 *      Name, designation and anonymous flag are in
 *      `data.metadata.custom_fields` (set by DonateForm.tsx).
 */

/* ───────── Placeholders: replace before launch ───────── */
const ORG_NAME = "St. Genevieve Maternal and Child Welfare Foundation";
const SITE_URL = "https://your-domain.org"; // PLACEHOLDER
const CONTACT_EMAIL = "info@stgenevievefoundation.org";
const LOCATION = "Lagos, Nigeria";
const FROM = `St. Genevieve Foundation <${CONTACT_EMAIL}>`; // must be a verified sender in the email provider

/* ───────── Types ───────── */
export type DonationEmailData = {
  donorName: string;
  email: string;
  amount: number; // naira (NOT kobo). Paystack sends kobo, so divide by 100 first
  designation: string; // e.g. "Maternal Healthcare"
  reference: string; // Paystack transaction reference
  paidAt: string; // ISO date string
};

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
};

/* ───────── Helpers ───────── */
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

const firstNameOf = (full: string) =>
  full.trim().split(/\s+/)[0] || "friend";

/* ───────── Template ───────── */
export function buildDonationEmail(
  data: DonationEmailData
): BuiltEmail {
  const firstName = escapeHtml(firstNameOf(data.donorName));
  const amount = formatNaira(data.amount);
  const designation = escapeHtml(data.designation);
  const reference = escapeHtml(data.reference);
  const date = formatDate(data.paidAt);

  const subject =
    "Thank you for your donation to the St. Genevieve Foundation";

  /* Email clients need table layout + inline styles. */
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background:#F7F5EE;font-family:Arial,Helvetica,sans-serif;color:#12312B;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5EE;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#12312B;padding:28px 32px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#E6A100;margin-right:8px;"></span>
                <span style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;">
                  ${escapeHtml(ORG_NAME)}
                </span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 32px 8px;">
                <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:700;color:#12312B;">
                  Thank you, ${firstName}.
                </h1>
                <p style="margin:18px 0 0;font-size:15px;line-height:1.8;color:#12312B;">
                  Your generous gift of <strong>${amount}</strong> has been received.
                  It will go to work for mothers and children in our communities,
                  and we are truly grateful you chose to stand with them.
                </p>
              </td>
            </tr>

            <!-- Summary -->
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6F2;border-radius:14px;">
                  <tr>
                    <td style="padding:20px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
                        <tr>
                          <td style="padding:6px 0;color:#12312B99;">Amount</td>
                          <td align="right" style="padding:6px 0;font-weight:700;">${amount}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#12312B99;">Your gift supports</td>
                          <td align="right" style="padding:6px 0;font-weight:700;">${designation}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#12312B99;">Date</td>
                          <td align="right" style="padding:6px 0;font-weight:700;">${date}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#12312B99;">Reference</td>
                          <td align="right" style="padding:6px 0;font-weight:700;word-break:break-all;">${reference}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Updates + CTA -->
            <tr>
              <td style="padding:20px 32px 8px;">
                <p style="margin:0;font-size:15px;line-height:1.8;color:#12312B;">
                  We will keep you posted on how your gift is making a difference,
                  with updates from the communities we serve.
                </p>
                <p style="margin:24px 0 0;">
                  <a href="${SITE_URL}/our-work"
                     style="display:inline-block;background:#E6A100;color:#12312B;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:999px;">
                    See our work
                  </a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:32px;">
                <p style="margin:0;font-size:12px;line-height:1.8;color:#12312B99;">
                  Questions about your gift? Reply to this email or write to
                  <a href="mailto:${CONTACT_EMAIL}" style="color:#12312B;">${CONTACT_EMAIL}</a>
                  and quote your reference above.
                </p>
                <p style="margin:12px 0 0;font-size:12px;line-height:1.8;color:#12312B99;">
                  ${escapeHtml(ORG_NAME)} · ${LOCATION}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  /* Plain-text version: required for good deliverability + accessibility. */
  const text = [
    `Thank you, ${firstNameOf(data.donorName)}.`,
    "",
    `Your generous gift of ${amount} has been received. It will go to work for mothers and children in our communities, and we are truly grateful you chose to stand with them.`,
    "",
    `Amount: ${amount}`,
    `Your gift supports: ${data.designation}`,
    `Date: ${date}`,
    `Reference: ${data.reference}`,
    "",
    "We will keep you posted on how your gift is making a difference, with updates from the communities we serve.",
    "",
    `See our work: ${SITE_URL}/our-work`,
    "",
    `Questions about your gift? Reply to this email or write to ${CONTACT_EMAIL} and quote your reference above.`,
    "",
    `${ORG_NAME} · ${LOCATION}`,
  ].join("\n");

  return { subject, html, text };
}

/* ───────── Sender (DUMMY: backend replaces the body) ───────── */
export async function sendDonationThankYouEmail(
  data: DonationEmailData
): Promise<{ sent: boolean; dummy: boolean }> {
  const email = buildDonationEmail(data);

  // DUMMY: log only. Remove this once a real provider is connected.
  console.log("[dummy email] from:", FROM);
  console.log("[dummy email] would send to:", data.email);
  console.log("[dummy email] subject:", email.subject);

  return { sent: false, dummy: true };

  /* ── REAL SEND (example with Resend; Postmark / SendGrid / Brevo work the same way) ──
   *
   * const res = await fetch("https://api.resend.com/emails", {
   *   method: "POST",
   *   headers: {
   *     Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
   *     "Content-Type": "application/json",
   *   },
   *   body: JSON.stringify({
   *     from: FROM,
   *     to: [data.email],
   *     subject: email.subject,
   *     html: email.html,
   *     text: email.text,
   *   }),
   * });
   *
   * if (!res.ok) {
   *   throw new Error(`Email failed: ${res.status}`);
   * }
   *
   * return { sent: true, dummy: false };
   */
}

/* ───────── Where to call it (inside the Paystack webhook) ─────────
 *
 * if (event === "charge.success" && data.currency === "NGN") {
 *   const fields = Object.fromEntries(
 *     (data.metadata?.custom_fields ?? []).map((f) => [
 *       f.variable_name,
 *       f.value,
 *     ])
 *   );
 *
 *   // Upsert by reference; inserted is false if this webhook was a retry.
 *   const inserted = await saveDonation({
 *     reference: data.reference,
 *     // ...other donation fields
 *   });
 *
 *   if (inserted) {
 *     try {
 *       await sendDonationThankYouEmail({
 *         donorName: fields.donor_name ?? "friend",
 *         email: data.customer.email,
 *         amount: data.amount / 100,
 *         designation:
 *           fields.designation ?? "Where it's needed most",
 *         reference: data.reference,
 *         paidAt: data.paid_at,
 *       });
 *     } catch (err) {
 *       console.error("Thank-you email failed", err);
 *       // Log it, never fail the webhook.
 *     }
 *   }
 * }
 *
 * // ...then always: return 200
 */