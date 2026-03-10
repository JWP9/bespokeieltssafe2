import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PredictionRequest {
  recordingUrl: string;
  questionId: string;
}

interface BandPrediction {
  band: number;
  feedback: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { recordingUrl, questionId }: PredictionRequest = await req.json();

    if (!recordingUrl || !questionId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: existingFeedback } = await supabase
      .from("ai_feedback")
      .select("*")
      .eq("user_id", user.id)
      .eq("question_id", questionId)
      .maybeSingle();

    if (existingFeedback) {
      return new Response(
        JSON.stringify({
          band: existingFeedback.band,
          feedback: existingFeedback.feedback,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const prediction: BandPrediction = generatePrediction();

    const { error: insertError } = await supabase
      .from("ai_feedback")
      .insert({
        user_id: user.id,
        question_id: questionId,
        band: prediction.band,
        feedback: prediction.feedback,
      });

    if (insertError) {
      console.error("Error saving feedback:", insertError);
    }

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function generatePrediction(): BandPrediction {
  const bandScore = (Math.floor(Math.random() * 15) + 45) / 10;

  const feedbackTemplates = [
    {
      band: 6.0,
      text: `**Fluency & Coherence:** Good flow with some hesitation. Natural pauses demonstrate thought organization. Work on reducing filler words and maintaining smoother transitions between ideas.

**Lexical Resource:** Good range of vocabulary with some topic-specific terms. Consider using more varied expressions and idiomatic language to enhance your responses.

**Grammatical Range & Accuracy:** Mix of simple and complex structures with generally good accuracy. Minor errors don't impede communication but work on consistency with verb tenses.

**Pronunciation:** Clear pronunciation with good intelligibility. Work on word stress patterns and varying your intonation to sound more natural.

**Strengths:**
- Confident delivery and good volume control
- Relevant examples to support your points
- Clear structure in presenting ideas

**Areas to Improve:**
- Extend answers with more detailed examples
- Practice more complex sentence structures
- Incorporate more idiomatic expressions`,
    },
    {
      band: 6.5,
      text: `**Fluency & Coherence:** Generally fluent with minimal hesitation. You maintain good flow throughout most of your response with natural pauses for thought organization.

**Lexical Resource:** Good vocabulary range with appropriate use of less common words. Your topic-specific terminology is well-applied. Consider incorporating more precise academic or formal vocabulary.

**Grammatical Range & Accuracy:** Good variety of grammatical structures used accurately. Occasional minor errors don't impact overall communication. Continue working on consistent use of complex structures.

**Pronunciation:** Very clear and easy to understand with mostly natural intonation patterns. Your rhythm and word stress are generally appropriate.

**Strengths:**
- Natural use of linking words and discourse markers
- Good topic development with relevant examples
- Appropriate use of pauses for emphasis

**Areas to Improve:**
- Reduce use of repetitive phrases
- Work on varying intonation patterns for emphasis
- Practice more sophisticated grammatical structures`,
    },
    {
      band: 7.0,
      text: `**Fluency & Coherence:** Excellent fluency with very natural speech patterns and confident delivery. You maintain smooth flow with appropriate pausing and clear progression of ideas.

**Lexical Resource:** Strong lexical resource with appropriate use of less common and idiomatic words. Your vocabulary choices are precise and natural, enhancing the overall quality of your response.

**Grammatical Range & Accuracy:** Variety of complex grammatical structures used accurately and appropriately. Errors are rare and don't impede communication. You demonstrate good control over grammar.

**Pronunciation:** Excellent pronunciation with natural rhythm and stress patterns. Your speech is consistently clear and intelligible with varied intonation that enhances meaning.

**Strengths:**
- Sophisticated vocabulary choices
- Natural, confident delivery throughout
- Excellent use of discourse markers and cohesive devices
- Strong topic development with well-chosen examples

**Areas to Improve:**
- Continue building specialized vocabulary for less familiar topics
- Experiment with even more varied sentence structures
- Consider adding more nuanced expressions and subtle language features`,
    },
    {
      band: 7.5,
      text: `**Fluency & Coherence:** Outstanding fluency with completely natural speech patterns. Your delivery is confident, smooth, and well-paced throughout with excellent use of discourse markers.

**Lexical Resource:** Excellent vocabulary range with precise and natural word choices. You effectively use idiomatic language and collocations appropriately, demonstrating strong command of English.

**Grammatical Range & Accuracy:** Excellent command of grammar with rare errors and sophisticated structures used naturally. You demonstrate consistent accuracy even with complex grammatical forms.

**Pronunciation:** Exemplary pronunciation with completely natural rhythm, stress, and intonation patterns. Your speech is effortlessly intelligible and sounds very natural.

**Strengths:**
- Exceptional fluency and natural delivery
- Sophisticated and precise vocabulary usage
- Complex ideas expressed clearly and effectively
- Native-like use of idioms and expressions
- Strong coherence and logical progression

**Areas to Improve:**
- Continue exposure to diverse topics to maintain breadth
- Explore even more nuanced and subtle language features
- Consider regional variations and formal registers for specific contexts`,
    },
  ];

  const closestTemplate = feedbackTemplates.reduce((prev, curr) =>
    Math.abs(curr.band - bandScore) < Math.abs(prev.band - bandScore) ? curr : prev
  );

  return {
    band: Number(bandScore.toFixed(1)),
    feedback: closestTemplate.text,
  };
}
