import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useResume } from '../hooks/useResume';

interface Props { onBack: () => void; }

const TEMPLATES = [
  { id: 'classic',      name: 'Classic ATS',    tag: 'Most Popular', desc: 'Clean single-column, maximum ATS compatibility.',        preview: 'classic' },
  { id: 'executive',    name: 'Executive',       tag: 'Senior',       desc: 'Bold full-color header, authoritative and commanding.',  preview: 'executive' },
  { id: 'minimal',      name: 'Minimal',         tag: 'Clean',        desc: 'Ultra-clean whitespace-first, nothing unnecessary.',    preview: 'minimal' },
  { id: 'sidebar',      name: 'Sidebar',         tag: 'Creative',     desc: 'Two-column with colored left sidebar panel.',           preview: 'sidebar' },
  { id: 'modern',       name: 'Modern',          tag: 'Trending',     desc: 'Accent bar headings, contemporary professional feel.',  preview: 'modern' },
  { id: 'compact',      name: 'Compact',         tag: 'Efficient',    desc: 'Dense layout — fits more content on one page.',         preview: 'compact' },
  { id: 'elegant',      name: 'Elegant',         tag: 'Premium',      desc: 'Serif typography, centered header, refined and polished.', preview: 'elegant' },
  { id: 'bold',         name: 'Bold',            tag: 'Impactful',    desc: 'Strong tinted header, stands out from the pile.',       preview: 'bold' },
  { id: 'timeline',     name: 'Timeline',        tag: 'Visual',       desc: 'Visual timeline for experience, great for storytelling.', preview: 'timeline' },
  { id: 'professional', name: 'Professional',    tag: 'Corporate',    desc: 'Vertical accent bar, structured two-tone layout.',      preview: 'professional' },
];

const TAG_COLORS: Record<string, string> = {
  'Most Popular': 'bg-blue-50 text-blue-700',
  'Senior':       'bg-violet-50 text-violet-700',
  'Clean':        'bg-slate-100 text-slate-600',
  'Creative':     'bg-purple-50 text-purple-700',
  'Trending':     'bg-cyan-50 text-cyan-700',
  'Efficient':    'bg-green-50 text-green-700',
  'Premium':      'bg-amber-50 text-amber-700',
  'Impactful':    'bg-red-50 text-red-700',
  'Visual':       'bg-orange-50 text-orange-700',
  'Corporate':    'bg-sky-50 text-sky-700',
};

function MiniPreview({ id, color }: { id: string; color: string }) {
  const line = <div className="h-1.5 rounded bg-current opacity-20 mb-1" />;
  const thinLine = <div className="h-1 rounded bg-slate-200 mb-1" />;

  const header = (
    <div className="mb-2">
      <div className="h-2 w-16 rounded mb-1" style={{ backgroundColor: color }} />
      <div className="flex gap-1">{[40, 30, 35].map(w => <div key={w} className="h-1 rounded bg-slate-200" style={{ width: w }} />)}</div>
    </div>
  );

  if (id === 'executive') return (
    <div className="w-full h-full flex flex-col">
      <div className="h-8 w-full rounded-t mb-2" style={{ backgroundColor: color }} />
      <div className="flex-1 px-1 space-y-1">{[1,2,3,4].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
    </div>
  );

  if (id === 'sidebar') return (
    <div className="w-full h-full flex gap-1">
      <div className="w-8 h-full rounded-l" style={{ backgroundColor: color }} />
      <div className="flex-1 pt-1 space-y-1">{[1,2,3,4,5].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
    </div>
  );

  if (id === 'minimal') return (
    <div className="w-full h-full pt-1">
      <div className="h-2.5 w-20 rounded bg-slate-300 mb-1" />
      <div className="h-px bg-slate-200 mb-2" />
      <div className="space-y-1">{[1,2,3,4].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
    </div>
  );

  if (id === 'bold') return (
    <div className="w-full h-full flex flex-col">
      <div className="h-9 w-full rounded-t mb-2 flex items-end px-1 pb-1" style={{ backgroundColor: color + '22' }}>
        <div className="h-1.5 w-12 rounded" style={{ backgroundColor: color }} />
      </div>
      <div className="flex-1 px-1 space-y-1">{[1,2,3].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
    </div>
  );

  if (id === 'timeline') return (
    <div className="w-full h-full pt-1 pl-2">
      <div className="h-2 w-14 rounded mb-2" style={{ backgroundColor: color }} />
      <div className="border-l-2 pl-2 space-y-2" style={{ borderColor: color + '55' }}>
        {[1,2,3].map(k => (
          <div key={k} className="relative">
            <div className="absolute -left-[9px] top-0.5 w-2 h-2 rounded-full border bg-white" style={{ borderColor: color }} />
            <div className="h-1 w-12 rounded bg-slate-300 mb-0.5" />
            <div className="h-1 w-8 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );

  if (id === 'professional') return (
    <div className="w-full h-full flex gap-1">
      <div className="w-2 h-full rounded-l" style={{ backgroundColor: color }} />
      <div className="flex-1 pt-1">
        <div className="h-2 w-14 rounded bg-slate-300 mb-1" />
        <div className="h-px bg-slate-200 mb-1.5" />
        <div className="space-y-1">{[1,2,3,4].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
      </div>
    </div>
  );

  if (id === 'elegant') return (
    <div className="w-full h-full flex flex-col items-center pt-1">
      <div className="h-2.5 w-16 rounded bg-slate-300 mb-0.5" />
      <div className="h-px w-20 bg-slate-200 mb-2" />
      <div className="w-full space-y-1">{[1,2,3,4].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
    </div>
  );

  if (id === 'compact') return (
    <div className="w-full h-full pt-0.5">
      <div className="flex items-baseline gap-1 mb-1">
        <div className="h-2 w-12 rounded" style={{ backgroundColor: color }} />
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      <div className="space-y-0.5">{[1,2,3,4,5,6].map(k => <div key={k} className="h-1 rounded bg-slate-200" />)}</div>
    </div>
  );

  // classic / modern default
  return (
    <div className="w-full h-full pt-1">
      {header}
      <div className="space-y-1">{[1,2,3,4].map(k => <div key={k}>{line}{thinLine}</div>)}</div>
    </div>
  );
}

export default function TemplatesPage({ onBack }: Props) {
  const { data, updateDesign } = useResume();
  const active = data.design.template || 'classic';
  const color = data.design.themeColor;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium mb-6 transition">
          <FiArrowLeft /> Back to Editor
        </button>

        <h1 className="text-2xl font-black text-slate-900 mb-1">Resume Templates</h1>
        <p className="text-slate-400 text-sm mb-8">Choose a layout. Your content and design settings carry over instantly.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TEMPLATES.map(t => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => updateDesign({ template: t.id })}
                className={`group flex flex-col rounded-2xl border-2 overflow-hidden transition-all text-left ${
                  isActive
                    ? 'border-slate-900 shadow-lg shadow-slate-900/10 scale-[1.02]'
                    : 'border-slate-100 hover:border-slate-300 hover:shadow-md bg-white'
                }`}
              >
                {/* mini preview */}
                <div className={`w-full h-28 p-2 relative ${isActive ? 'bg-slate-50' : 'bg-white'}`}>
                  <MiniPreview id={t.id} color={color} />
                  {isActive && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center">
                      <FiCheck className="text-white text-[10px]" />
                    </div>
                  )}
                </div>
                {/* info */}
                <div className={`px-3 py-2.5 border-t ${isActive ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{t.name}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : TAG_COLORS[t.tag]}`}>{t.tag}</span>
                  </div>
                  <p className={`text-[9.5px] leading-snug ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
          <strong>Tip:</strong> You can also toggle templates directly from the preview panel in the editor using the template switcher bar.
        </div>
      </div>
    </div>
  );
}
