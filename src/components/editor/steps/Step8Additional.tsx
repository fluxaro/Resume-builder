import { useResume } from '../../../hooks/useResume';
import { Input, Button } from '../../ui/Inputs';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Step8Additional() {
  const { data, addAdditional, updateAdditional, removeAdditional } = useResume();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">Volunteer experience, extracurricular activities, etc.</p>
        <Button onClick={addAdditional} variant="secondary" size="sm"><FiPlus /> Add Item</Button>
      </div>

      <div className="flex flex-col gap-4">
        {data.additional.map((item, index) => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Item {index + 1}</span>
              <button onClick={() => removeAdditional(item.id)} className="text-red-400 hover:text-red-600 p-1.5 bg-red-50 rounded-lg transition">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Role" placeholder="Event Coordinator" value={item.role} onChange={e => updateAdditional(item.id, { role: e.target.value })} />
              <Input label="Organization" placeholder="Red Cross" value={item.organization} onChange={e => updateAdditional(item.id, { organization: e.target.value })} />
              <div className="md:col-span-2">
                <Input label="Duration / Dates" placeholder="Jan 2021 – Present" value={item.duration} onChange={e => updateAdditional(item.id, { duration: e.target.value })} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.additional.length === 0 && (
        <div className="text-center p-10 border-2 border-dashed border-slate-100 rounded-xl">
          <p className="text-slate-400 text-sm mb-4">No additional experience added yet.</p>
          <Button onClick={addAdditional} variant="outline"><FiPlus /> Add Item</Button>
        </div>
      )}
    </div>
  );
}
