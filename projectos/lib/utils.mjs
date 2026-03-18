export const slugify = (input) =>
  input.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'project';
export const unique = (items) => Array.from(new Set(items));
