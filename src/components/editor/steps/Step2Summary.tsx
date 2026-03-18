import { useResume } from '../../../hooks/useResume';
import { Textarea } from '../../ui/Inputs';

const LEVELS = [
  { id: 'entry', title: 'Entry Level', sub: '0–2 years' },
  { id: 'mid', title: 'Mid Level', sub: '3–5 years' },
  { id: 'senior', title: 'Senior+', sub: '5+ years' },
];

export default function Step2Summary() {
  const { data, updateSummary, updateCoreCompetencies, updateExperienceLevel } = useResume();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider block mb-3">Experience Level</label>
        <div className="grid grid-cols-3 gap-3">
          {LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => updateExperienceLevel(level.id)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                data.experienceLevel === level.id
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-sm">{level.title}</div>
              <div className={`text-xs mt-0.5 ${data.experienceLevel === level.id ? 'text-slate-300' : 'text-slate-400'}`}>{level.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">Professional Summary</h3>
        <p className="text-xs text-slate-400 mb-3">Write a concise 3–4 sentence career objective that highlights your key strengths and goals.</p>
        <Textarea
          label=""
          placeholder="A results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, performance, and delivering great user experiences..."
          value={data.summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="min-h-[140px]"
        />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">Core Competencies</h3>
        <p className="text-xs text-slate-400 mb-3">Highlight 3–5 high-level strengths (e.g. Agile Leadership, Cloud Architecture).</p>
        <Textarea
          label=""
          placeholder="• Product Strategy&#10;• Agile Methodologies&#10;• Full-Stack Development"
          value={data.coreCompetencies}
          onChange={(e) => updateCoreCompetencies(e.target.value)}
          className="min-h-[90px]"
        />
      </div>
    </div>
  );
}
