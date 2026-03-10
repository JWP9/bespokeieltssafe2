import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Resend API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const now = new Date();
    const windowStart = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    const windowEnd = new Date(now.getTime() + 25 * 60 * 60 * 1000);

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, trial_end, reminder_sent_at")
      .eq("role", "premium_trial")
      .gte("trial_end", windowStart.toISOString())
      .lte("trial_end", windowEnd.toISOString())
      .is("reminder_sent_at", null);

    if (profilesError) {
      return new Response(
        JSON.stringify({ error: "Failed to query profiles", details: profilesError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!profiles || profiles.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No users due for reminder" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let sent = 0;
    let failed = 0;

    for (const profile of profiles) {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profile.id);

      if (userError || !userData?.user?.email) {
        failed++;
        continue;
      }

      const email = userData.user.email;
      const name = userData.user.user_metadata?.full_name || userData.user.user_metadata?.name || "there";

      const emailBody = `Hi ${name},

Just a heads-up — your 7-day free trial at Bespoke IELTS ends tomorrow.

During your trial you've had unlimited access to:
• Full mock listening and reading tests
• AI-powered band score predictions
• Speaking and writing practice with detailed feedback

Don't lose access. Upgrade now for just $12/mo and keep everything you've been using.

Click below to subscribe:
https://bespokeielts.com/?subscribe=1

Questions? Just reply to this email — we're happy to help.

Best,
The Bespoke IELTS Team`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Bespoke IELTS <consultation@bespokeielts.com>",
          to: [email],
          subject: "Your Bespoke IELTS trial ends tomorrow",
          text: emailBody,
        }),
      });

      if (emailRes.ok) {
        await supabase
          .from("profiles")
          .update({ reminder_sent_at: now.toISOString() })
          .eq("id", profile.id);
        sent++;
      } else {
        failed++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, sent, failed }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
