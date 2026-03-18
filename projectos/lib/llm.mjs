export async function generateText(_prompts, fallback) {
  if (!process.env.OPENAI_API_KEY) return `${fallback}\n\n[Mock LLM mode enabled because OPENAI_API_KEY is not configured.]`;
  return `${fallback}\n\n[Adapter ready for real LLM integration.]`;
}
