
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not set in Supabase environment');
    }

    const { company, position, questions, answers, keywords } = await req.json();

    // Prepare system instruction for OpenAI
    const systemPrompt = `You are an AI assistant specialized in creating professional cover letters in Korean.
    Generate a detailed, professional cover letter section for each question based on the user's input.
    The cover letter should:
    - Be written in Korean
    - Be professional and formal
    - Include the keywords provided by the user naturally
    - Be approximately 300-500 characters per question
    - Highlight the user's strengths and qualifications
    - Be tailored to the specific company and position`;

    // Prepare the user message combining all inputs
    const userPrompt = `
    회사: ${company}
    직무: ${position}
    강조 키워드: ${keywords.join(', ')}
    
    다음 질문들에 대한 자기소개서 내용을 각각 생성해주세요:
    ${questions.map((q, i) => `
    질문 ${i + 1}: ${q}
    답변 힌트: ${answers[i] || '정보 없음'}
    `).join('\n')}`;

    console.log("Sending request to OpenAI with:", {
      model: "gpt-4o-mini",
      systemPrompt,
      userPrompt
    });

    // Make the API call to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API returned an error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log("OpenAI response received successfully");

    // Process the generated content to separate answers by question
    let processedContent = [];
    
    // Simple parsing to split content by question markers
    const contentSections = generatedContent.split(/질문 \d+:|Question \d+:/g);
    
    // Remove first empty section if it exists
    if (contentSections[0].trim() === '') {
      contentSections.shift();
    }
    
    // If parsing failed or returned empty, just return the full content for each question
    if (contentSections.length < questions.length) {
      processedContent = questions.map((_, i) => ({
        question: questions[i],
        answer: generatedContent,
      }));
    } else {
      processedContent = questions.map((q, i) => ({
        question: q,
        answer: contentSections[i] ? contentSections[i].trim() : generatedContent,
      }));
    }

    return new Response(
      JSON.stringify({
        success: true,
        coverLetter: {
          company,
          position,
          sections: processedContent,
          keywords,
          date: new Date().toISOString(),
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-cover-letter function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
