import { useResume } from '../../../hooks/useResume';
import { Input, Textarea, Button } from '../../ui/Inputs';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Step7Certifications() {
  const { data, addCertification, updateCertification, removeCertification } = useResume();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">Add certifications, awards, or achievements.</p>
        <Button onClick={addCertification} variant="secondary" size="sm"><FiPlus /> Add Certification</Button>
      </div>

      <div className="flex flex-col gap-4">
        {data.certifications.map((cert, index) => (
          <div key={cert.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Item {index + 1}</span>
              <button onClick={() => removeCertification(cert.id)} className="text-red-400 hover:text-red-600 p-1.5 bg-red-50 rounded-lg transition">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Certification / Award Name" placeholder="AWS Certified Solutions Architect" value={cert.name} onChange={e => updateCertification(cert.id, { name: e.target.value })} />
              <Input label="Issuing Organization" placeholder="Amazon Web Services" value={cert.issuer} onChange={e => updateCertification(cert.id, { issuer: e.target.value })} />
              <Input label="Date Received" type="month" value={cert.date} onChange={e => updateCertification(cert.id, { date: e.target.value })} />
            </div>
            <div className="mt-3">
              <Textarea label="Description (Optional)" placeholder="Briefly describe the significance..." value={cert.description || ''} onChange={e => updateCertification(cert.id, { description: e.target.value })} className="min-h-[70px]" />
            </div>
          </div>
        ))}
      </div>

      {data.certifications.length === 0 && (
        <div className="text-center p-10 border-2 border-dashed border-slate-100 rounded-xl">
          <p className="text-slate-400 text-sm mb-4">No certifications added yet.</p>
          <Button onClick={addCertification} variant="outline"><FiPlus /> Add Certification</Button>
        </div>
      )}
    </div>
  );
}
