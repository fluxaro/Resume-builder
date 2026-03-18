import { useResume } from '../../../hooks/useResume';
import { Textarea } from '../../ui/Inputs';

export default function Step5Skills() {
  const { data, updateSkills } = useResume();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">Technical / Hard Skills</h3>
        <p className="text-xs text-slate-400 mb-3">List your core hard skills, separated by commas.</p>
        <Textarea
          label=""
          placeholder="JavaScript, React, Node.js, TypeScript, Docker, PostgreSQL, AWS..."
          value={data.skills.hard}
          onChange={(e) => updateSkills({ hard: e.target.value })}
          className="min-h-[90px]"
        />
      </div>

      <div className="h-px bg-slate-100" />

      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">Soft Skills</h3>
        <p className="text-xs text-slate-400 mb-3">Leadership, teamwork, communication, etc.</p>
        <Textarea
          label=""
          placeholder="Agile Leadership, Cross-functional Collaboration, Public Speaking..."
          value={data.skills.soft}
          onChange={(e) => updateSkills({ soft: e.target.value })}
          className="min-h-[80px]"
        />
      </div>

      <div className="h-px bg-slate-100" />

      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">Languages Spoken</h3>
        <p className="text-xs text-slate-400 mb-3">Include proficiency level (e.g. English (Native), Spanish (B2)).</p>
        <Textarea
          label=""
          placeholder="English (Native), French (B2 Intermediate)..."
          value={data.skills.languages}
          onChange={(e) => updateSkills({ languages: e.target.value })}
          className="min-h-[70px]"
        />
      </div>
    </div>
  );
}
