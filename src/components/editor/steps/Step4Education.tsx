import { useResume } from '../../../hooks/useResume';
import { Input, Textarea, Button } from '../../ui/Inputs';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Step4Education() {
  const { data, addEducation, updateEducation, removeEducation } = useResume();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">List your educational background.</p>
        <Button onClick={addEducation} variant="secondary" size="sm"><FiPlus /> Add Education</Button>
      </div>

      <div className="flex flex-col gap-4">
        {data.educations.map((edu, index) => (
          <div key={edu.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education {index + 1}</span>
              <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600 p-1.5 bg-red-50 rounded-lg transition">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Institution" placeholder="University of Technology" value={edu.institution} onChange={e => updateEducation(edu.id, { institution: e.target.value })} />
              <Input label="Degree" placeholder="Bachelor of Science" value={edu.degree} onChange={e => updateEducation(edu.id, { degree: e.target.value })} />
              <Input label="Field of Study" placeholder="Computer Science" value={edu.field} onChange={e => updateEducation(edu.id, { field: e.target.value })} />
              <Input label="GPA / Honors (Optional)" placeholder="3.8 / Summa Cum Laude" value={edu.gpa || ''} onChange={e => updateEducation(edu.id, { gpa: e.target.value })} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <input type="month" className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={edu.startDate} onChange={e => updateEducation(edu.id, { startDate: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">End / Graduation Date</label>
                <input type="month" className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={edu.endDate} onChange={e => updateEducation(edu.id, { endDate: e.target.value })} />
              </div>
            </div>
            <div className="mt-3">
              <Textarea label="Coursework / Projects (Optional)" placeholder="Relevant Coursework: Data Structures, AI, Machine Learning..." value={edu.coursework || ''} onChange={e => updateEducation(edu.id, { coursework: e.target.value })} className="min-h-[70px]" />
            </div>
          </div>
        ))}
      </div>

      {data.educations.length === 0 && (
        <div className="text-center p-10 border-2 border-dashed border-slate-100 rounded-xl">
          <p className="text-slate-400 text-sm mb-4">No education entries yet.</p>
          <Button onClick={addEducation} variant="outline"><FiPlus /> Add Education</Button>
        </div>
      )}
    </div>
  );
}
