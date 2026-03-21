import { useResume } from '../../../hooks/useResume';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

const checks = [
  { label: 'Full name and contact details filled in', key: (d: any) => !!d.personalInfo.fullName && !!d.personalInfo.email },
  { label: 'Professional summary written', key: (d: any) => d.summary.trim().length > 30 },
  { label: 'At least one work experience added', key: (d: any) => d.experiences.length > 0 },
  { label: 'At least one education entry added', key: (d: any) => d.educations.length > 0 },
  { label: 'Skills section filled in', key: (d: any) => d.skills.hard.trim().length > 0 },
  { label: 'Phone number provided', key: (d: any) => !!d.personalInfo.phone },
  { label: 'Location provided', key: (d: any) => !!d.personalInfo.location },
  { label: 'LinkedIn or website added', key: (d: any) => !!d.personalInfo.linkedin || !!d.personalInfo.website },
  { label: 'Template and design customised', key: (d: any) => d.design.template !== 'classic' || d.design.themeColor !== '#000000' },
  { label: 'Ready to download PDF', key: () => true },
];

export default function Step10Optimize() {
  const { data } = useResume();
  const passed = checks.filter(c => c.key(data)).length;
  const pct = Math.round((passed / checks.length) * 100);
  const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626';

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Resume Completeness</h3>
          <span className="text-2xl font-black" style={{ color }}>{pct}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {pct === 100 ? 'Your resume looks complete. Ready to download!' : `${checks.length - passed} item${checks.length - passed !== 1 ? 's' : ''} left to complete.`}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {checks.map((c) => {
          const ok = c.key(data);
          return (
            <div key={c.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${ok ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${ok ? 'bg-emerald-500' : 'bg-slate-100'}`}>
                {ok ? <FiCheck size={11} className="text-white" /> : <FiAlertCircle size={11} className="text-slate-400" />}
              </div>
              <span className={`text-sm ${ok ? 'text-emerald-800 font-medium' : 'text-slate-500'}`}>{c.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
