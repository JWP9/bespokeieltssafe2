import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { skill } = body;

    if (!skill || !["reading", "writing_task1", "writing_task2", "listening_section"].includes(skill)) {
      return new Response(JSON.stringify({ error: "Invalid skill. Must be reading, writing_task1, writing_task2, or listening_section" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("AI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let prompt = "";

    if (skill === "reading") {
      const { correctAnswers, userAnswers, passageExcerpt } = body;
      prompt = `You are an IELTS examiner. Score this Reading section out of 10.
Correct answers: ${JSON.stringify(correctAnswers)}
User answers: ${JSON.stringify(userAnswers)}
Passage excerpt: ${passageExcerpt}

Give ONLY valid JSON with no markdown formatting:
{
  "raw_score": <number out of 10>,
  "estimated_band": <number in 0.5 increments from 1 to 9>,
  "wrong_answers": [{"question": <number>, "explanation": <string>, "correct": <string>, "suggestion": <string>}],
  "overall_tip": <string>
}

Be strict but encouraging like Simon from IELTS Simon. Focus on synonyms, paraphrasing, True/False/Not Given confusion.`;
    } else if (skill === "writing_task1") {
      const { taskDescription, userResponse } = body;
      prompt = `You are an IELTS Writing Task 1 expert examiner providing detailed feedback to help students improve. Score this Writing Task 1 response out of 9 and provide constructive, actionable feedback.

Task: ${taskDescription}
User response: ${userResponse}

Provide feedback in ONLY valid JSON with no markdown formatting:
{
  "task_achievement": <number in 0.5 increments from 0.5 to 9>,
  "coherence_cohesion": <number in 0.5 increments from 0.5 to 9>,
  "lexical_resource": <number in 0.5 increments from 0.5 to 9>,
  "grammatical_range_accuracy": <number in 0.5 increments from 0.5 to 9>,
  "overall_band": <average of the four above, rounded to nearest 0.5>,
  "strengths": [<2-3 specific positive aspects referencing particular parts of the response>, ...],
  "areas_to_improve": [<2-3 key areas that need development with specific, actionable suggestions and IELTS criterion references>, ...],
  "bespoke_tip": <one practical, specific tip that directly addresses the student's most significant weakness with a clear, actionable strategy>
}

Instructions for feedback:
- Be constructive and encouraging
- Make feedback specific rather than generic
- Focus on IELTS assessment criteria: Task Achievement/Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy
- Make all suggestions practical and actionable
- Reference the student's actual text when identifying strengths and weaknesses
- For areas to improve, suggest concrete strategies that will impact their IELTS score
- The bespoke tip should address the single biggest weakness that will have the most impact on score improvement`;
    } else if (skill === "listening_section") {
      const { sectionTitle, correctAnswers, userAnswers } = body;
      prompt = `You are an IELTS examiner. Score this Listening section (10 questions) out of 10.
Section context: ${sectionTitle}
Correct answers: ${JSON.stringify(correctAnswers)}
User answers: ${JSON.stringify(userAnswers)}

Give ONLY valid JSON with no markdown formatting:
{
  "raw_score": <number out of 10>,
  "estimated_band": <number in 0.5 increments from 1 to 9>,
  "wrong_answers": [{"question": <number>, "explanation": <string>, "correct": <string>, "suggestion": <string>}],
  "overall_tip": <string>
}

Be strict but encouraging like Simon from IELTS Simon. Focus on spelling accuracy, word count limits, number formats, and listening for paraphrased answers.`;
    } else if (skill === "writing_task2") {
      const { question, userEssay } = body;
      prompt = `You are an IELTS Writing Task 2 expert examiner providing detailed feedback to help students improve. Score this Writing Task 2 essay out of 9 and provide constructive, actionable feedback.

Question: ${question}
User essay: ${userEssay}

Provide feedback in ONLY valid JSON with no markdown formatting:
{
  "task_response": <number in 0.5 increments from 0.5 to 9>,
  "coherence_cohesion": <number in 0.5 increments from 0.5 to 9>,
  "lexical_resource": <number in 0.5 increments from 0.5 to 9>,
  "grammatical_range_accuracy": <number in 0.5 increments from 0.5 to 9>,
  "overall_band": <average of the four above, rounded to nearest 0.5>,
  "strengths": [<2-3 specific positive aspects referencing particular parts of the essay>, ...],
  "areas_to_improve": [<2-3 key areas that need development with specific, actionable suggestions and IELTS criterion references>, ...],
  "bespoke_tip": <one practical, specific tip that directly addresses the student's most significant weakness with a clear, actionable strategy>
}

Instructions for feedback:
- Be constructive and encouraging
- Make feedback specific rather than generic
- Focus on IELTS assessment criteria: Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy
- Make all suggestions practical and actionable
- Reference the student's actual text when identifying strengths and weaknesses
- For areas to improve, suggest concrete strategies that will impact their IELTS score
- The bespoke tip should address the single biggest weakness that will have the most impact on score improvement`;
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1200,
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      console.error("OpenAI error:", err);
      return new Response(JSON.stringify({ error: "OpenAI request failed", detail: err }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content ?? "";

    let feedback: unknown;
    try {
      const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      feedback = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse OpenAI response:", rawContent);
      return new Response(JSON.stringify({ error: "Failed to parse AI response", raw: rawContent }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ feedback }), {
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
