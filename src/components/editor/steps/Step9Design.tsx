import { useResume } from '../../../hooks/useResume';
import { FiCheck } from 'react-icons/fi';

const COLORS = [
  { value: '#0f172a', label: 'Midnight' },
  { value: '#1e40af', label: 'Royal Blue' },
  { value: '#1d4ed8', label: 'Blue' },
  { value: '#0369a1', label: 'Sky Blue' },
  { value: '#0891b2', label: 'Cyan' },
  { value: '#0d9488', label: 'Teal' },
  { value: '#16a34a', label: 'Green' },
  { value: '#15803d', label: 'Forest' },
  { value: '#65a30d', label: 'Lime' },
  { value: '#ca8a04', label: 'Amber' },
  { value: '#d97706', label: 'Orange' },
  { value: '#ea580c', label: 'Burnt' },
  { value: '#dc2626', label: 'Red' },
  { value: '#be123c', label: 'Rose' },
  { value: '#9333ea', label: 'Purple' },
  { value: '#7c3aed', label: 'Violet' },
  { value: '#db2777', label: 'Pink' },
  { value: '#475569', label: 'Slate' },
  { value: '#374151', label: 'Gray' },
  { value: '#292524', label: 'Stone' },
];

const FONTS = [
  { name: 'Inter', value: '"Inter", sans-serif', preview: 'Clean & Modern' },
  { name: 'DM Sans', value: '"DM Sans", sans-serif', preview: 'Geometric & Friendly' },
  { name: 'Poppins', value: '"Poppins", sans-serif', preview: 'Rounded & Bold' },
  { name: 'Lato', value: '"Lato", sans-serif', preview: 'Humanist & Warm' },
  { name: 'Raleway', value: '"Raleway", sans-serif', preview: 'Elegant & Stylish' },
  { name: 'Roboto', value: '"Roboto", sans-serif', preview: 'Neutral & Versatile' },
  { name: 'Merriweather', value: '"Merriweather", serif', preview: 'Classic & Readable' },
  { name: 'Playfair Display', value: '"Playfair Display", serif', preview: 'Editorial & Refined' },
  { name: 'Source Serif 4', value: '"Source Serif 4", serif', preview: 'Academic & Trustworthy' },
  { name: 'Fira Code', value: '"Fira Code", monospace', preview: 'Technical & Precise' },
];

export default function Step9Design() {
  const { data, updateDesign } = useResume();
  const { design } = data;

  return (
    <div className="flex flex-col gap-8">
      <p className="text-slate-500 text-sm">
        Customize your resume's look. All changes reflect instantly in the preview.
      </p>

      {/* Theme Color */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Theme Color</label>
          <p className="text-xs text-slate-400 mt-1">Sets the accent color for headings, borders, and highlights.</p>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              title={color.label}
              onClick={() => updateDesign({ themeColor: color.value })}
              className={`relative w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${
                design.themeColor === color.value ? 'border-slate-900 scale-110 shadow-md' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
            >
              {design.themeColor === color.value && (
                <FiCheck className="absolute inset-0 m-auto text-white drop-shadow" size={14} />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <label className="text-xs font-medium text-slate-600">Custom color:</label>
          <input
            type="color"
            value={design.themeColor}
            onChange={(e) => updateDesign({ themeColor: e.target.value })}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
          />
          <span className="text-xs text-slate-400 font-mono">{design.themeColor}</span>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      {/* Font Family */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Typography</label>
          <p className="text-xs text-slate-400 mt-1">Choose a font that matches your industry and personal style.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FONTS.map((font) => (
            <button
              key={font.name}
              onClick={() => updateDesign({ fontFamily: font.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-sm ${
                design.fontFamily === font.value
                  ? 'border-slate-900 bg-slate-50 shadow-sm'
                  : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}
              style={{ fontFamily: font.value }}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-base font-semibold text-slate-900">{font.name}</h4>
                {design.fontFamily === font.value && (
                  <span className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full font-medium">Active</span>
                )}
              </div>
              <p className="text-xs text-slate-400">{font.preview}</p>
              <p className="text-sm text-slate-600 mt-2">The quick brown fox jumps over the lazy dog.</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      {/* Preview swatch */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Live Preview</label>
        <div className="p-5 rounded-xl border border-slate-100 bg-white" style={{ fontFamily: design.fontFamily }}>
          <div className="h-1 w-full rounded mb-4" style={{ backgroundColor: design.themeColor }} />
          <h3 className="text-xl font-black mb-1" style={{ color: design.themeColor }}>YOUR NAME</h3>
          <p className="text-xs text-slate-500 mb-3">email@example.com · +1 555 000 0000 · City, Country</p>
          <div className="text-xs font-bold uppercase tracking-widest mb-1 pb-1 border-b-2" style={{ color: design.themeColor, borderColor: design.themeColor + '33' }}>Experience</div>
          <p className="text-xs text-slate-600 mt-2">Senior Developer · Acme Corp · 2021 – Present</p>
        </div>
      </div>
    </div>
  );
}
