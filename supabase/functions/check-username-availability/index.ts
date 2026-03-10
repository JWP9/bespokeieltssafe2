import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { username } = body;

    if (!username || typeof username !== "string") {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sanitized = username.trim().toLowerCase();

    if (sanitized.length < 3 || sanitized.length > 20) {
      return new Response(JSON.stringify({
        available: false,
        error: "Username must be between 3-20 characters"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!/^[a-z0-9_\-\u4E00-\u9FFF]+$/u.test(sanitized)) {
      return new Response(JSON.stringify({
        available: false,
        error: "Username can only contain letters, numbers, hyphens, underscores, or Chinese characters"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!/^[a-z0-9\u4E00-\u9FFF].*[a-z0-9\u4E00-\u9FFF]$|^[a-z0-9\u4E00-\u9FFF]$/u.test(sanitized)) {
      return new Response(JSON.stringify({
        available: false,
        error: "Username cannot start or end with a hyphen or underscore"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESERVED_WORDS = [
      'admin', 'system', 'moderator', 'bot', 'api', 'test', 'root',
      'user', 'guest', 'undefined', 'null', 'support'
    ];

    if (RESERVED_WORDS.includes(sanitized)) {
      return new Response(JSON.stringify({
        available: false,
        error: "This username is reserved"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: existingUser, error: userError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("username", sanitized)
      .maybeSingle();

    if (userError && userError.code !== "PGRST116") {
      throw userError;
    }

    if (existingUser) {
      return new Response(JSON.stringify({
        available: false,
        error: "Username is already taken"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: reserved, error: reservedError } = await supabase
      .from("reserved_usernames")
      .select("username")
      .eq("username", sanitized)
      .maybeSingle();

    if (reservedError && reservedError.code !== "PGRST116") {
      throw reservedError;
    }

    if (reserved) {
      return new Response(JSON.stringify({
        available: false,
        error: "This username is reserved"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ available: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
