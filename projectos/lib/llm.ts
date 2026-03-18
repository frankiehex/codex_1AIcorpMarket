export type LlmPrompt = { role: 'system' | 'user'; content: string };

export async function generateText(prompts: LlmPrompt[], fallback: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return `${fallback}\n\n[Mock LLM mode enabled because OPENAI_API_KEY is not configured.]`;
  }

  return `${fallback}\n\n[Adapter ready for real LLM integration.]`;
}
