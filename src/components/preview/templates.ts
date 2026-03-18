export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  tag: string;
  accent: string; // preview swatch color
}

export const TEMPLATES: TemplateConfig[] = [
  { id: 'classic',      name: 'Classic ATS',      description: 'Clean single-column, maximum ATS compatibility.',         tag: 'Most Popular', accent: '#0f172a' },
  { id: 'executive',    name: 'Executive',         description: 'Bold header bar, authoritative and senior-level.',        tag: 'Senior',       accent: '#1e40af' },
  { id: 'minimal',      name: 'Minimal',           description: 'Ultra-clean whitespace-first design.',                    tag: 'Clean',        accent: '#374151' },
  { id: 'sidebar',      name: 'Sidebar',           description: 'Two-column with colored left sidebar.',                   tag: 'Creative',     accent: '#7c3aed' },
  { id: 'modern',       name: 'Modern',            description: 'Accent line headers, contemporary feel.',                 tag: 'Trending',     accent: '#0891b2' },
  { id: 'compact',      name: 'Compact',           description: 'Dense layout, fits more on one page.',                    tag: 'Efficient',    accent: '#16a34a' },
  { id: 'elegant',      name: 'Elegant',           description: 'Serif typography, refined and polished.',                 tag: 'Premium',      accent: '#9333ea' },
  { id: 'bold',         name: 'Bold',              description: 'Strong typography, stands out from the pile.',            tag: 'Impactful',    accent: '#dc2626' },
  { id: 'timeline',     name: 'Timeline',          description: 'Visual timeline for experience sections.',                tag: 'Visual',       accent: '#d97706' },
  { id: 'professional', name: 'Professional',      description: 'Structured two-tone header, corporate-ready.',            tag: 'Corporate',    accent: '#0369a1' },
];
