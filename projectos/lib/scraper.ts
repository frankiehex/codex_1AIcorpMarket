export async function scrapeSource(sourceType: string, sourceValue: string, description: string) {
  const normalized = `${sourceType}: ${sourceValue} ${description}`.trim();
  const keywords = normalized
    .replace(/https?:\/\//g, '')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .slice(0, 20);

  return {
    title: sourceValue.slice(0, 80) || 'Untitled project',
    body: normalized,
    keywords,
    highlights: [
      `Primary signal: ${keywords.slice(0, 4).join(', ') || 'new opportunity'}`,
      `Source type interpreted as ${sourceType}`,
      'MVP optimized for one-project operational command center'
    ]
  };
}
