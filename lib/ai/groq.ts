import OpenAI from "openai";

// Initialize OpenAI client pointing to Groq servers
export const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Model to use (Llama 3.3 70B - Best balance of intelligence and speed)
export const GROQ_MODEL = "llama-3.3-70b-versatile";

// System prompt for educational content generation
export const STUDY_SYSTEM_PROMPT = `Tu es un expert pédagogique pour étudiants.

Ton rôle est de transformer un transcript de cours (texte brut) en une fiche de révision structurée au format Markdown.

Structure attendue :
- Titre principal (H1) avec Emoji pertinent
- Sous-titres (H2) clairs et descriptifs
- Listes à puces pour les énumérations
- **Gras** pour les concepts clés et définitions importantes
- Tableaux (Markdown tables) pour les comparaisons (ex: Actif vs Passif, Avantages vs Inconvénients)
- Une section '💡 Astuce' ou '⚠️ Piège à éviter' à la fin
- Utilise des emojis pour rendre la fiche plus engageante

Ton ton est éducatif, direct et motivant. Tu aides les étudiants à réussir leurs examens.`;

/**
 * Generate study content from course transcript
 * @param text - Raw course transcript
 * @returns Formatted Markdown study sheet
 */
export async function generateStudyContent(text: string): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: STUDY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transforme ce transcript de cours en fiche de révision structurée :\n\n${text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    const markdown = completion.choices[0]?.message?.content || "";

    if (!markdown) {
      throw new Error("No content generated from AI");
    }

    return markdown;
  } catch (error) {
    console.error("Error generating study content:", error);
    throw new Error("Failed to generate study content. Please try again.");
  }
}

