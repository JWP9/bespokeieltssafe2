import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  name: string;
  email: string;
  phone?: string | null;
  skills?: string[] | null;
  challenges: string;
  details?: string | null;
  sendConfirmation?: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Resend API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: LeadPayload = await req.json();
    const { name, email, phone, skills, challenges, details, sendConfirmation } = payload;

    const skillsList = skills && skills.length > 0 ? skills.join(", ") : "Not specified";
    const phoneStr = phone || "Not provided";
    const detailsStr = details || "None";

    const adminBody = `New IELTS consultation enquiry received.

Name: ${name}
Email: ${email}
Phone: ${phoneStr}
Skills: ${skillsList}
Challenges: ${challenges}
Additional Details: ${detailsStr}

---
Sent from Bespoke IELTS contact form.`;

    console.log("[notify-new-lead] Sending admin email for lead:", name, email);

    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bespoke IELTS <consultation@bespokeielts.com>",
        to: ["consultation@bespokeielts.com"],
        subject: `New IELTS Lead: ${name}`,
        text: adminBody,
      }),
    });

    const adminOk = adminEmailRes.ok;
    const adminResponseText = await adminEmailRes.text();
    console.log("[notify-new-lead] Admin email response:", adminEmailRes.status, adminResponseText);

    if (sendConfirmation) {
      const confirmBody = `Hi ${name},

Thanks for getting in touch! We've received your details and will review them shortly.

We'll be in touch soon to discuss your personalised IELTS plan.

Best regards,
The Bespoke IELTS Team`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Bespoke IELTS <consultation@bespokeielts.com>",
          to: [email],
          subject: "Thanks! We'll review your details soon.",
          text: confirmBody,
        }),
      });
    }

    if (!adminOk) {
      console.error("[notify-new-lead] Admin email failed:", adminResponseText);
      return new Response(
        JSON.stringify({ error: "Failed to send admin email", details: adminResponseText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
