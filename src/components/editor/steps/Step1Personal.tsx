import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/Inputs';
import { FiCamera, FiUpload } from 'react-icons/fi';

export default function Step1Personal() {
  const { data, updatePersonalInfo } = useResume();
  const info = data.personalInfo;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonalInfo({ photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <p className="text-slate-500 text-sm">Start with your basic contact information and professional links.</p>

      <div className="flex items-center gap-5 p-5 border border-dashed border-slate-200 rounded-xl bg-slate-50">
        <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-slate-200 shrink-0">
          {info.photo ? (
            <img src={info.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FiCamera className="text-2xl text-slate-300" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm font-semibold text-slate-900 mb-0.5">Professional Photo</label>
          <p className="text-xs text-slate-400 mb-3">Optional. Recommended for EU/creative roles.</p>
          <div className="relative inline-block">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <button className="flex items-center gap-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition">
              <FiUpload /> {info.photo ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name" placeholder="John Doe" value={info.fullName} onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} />
        <Input label="Email Address" type="email" placeholder="john@example.com" value={info.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
        <Input label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" value={info.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
        <Input label="Location" placeholder="New York, NY" value={info.location} onChange={(e) => updatePersonalInfo({ location: e.target.value })} />
      </div>

      <div className="h-px bg-slate-100 w-full" />

      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-4">Professional Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="LinkedIn URL" placeholder="linkedin.com/in/johndoe" value={info.linkedin} onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })} />
          <Input label="Portfolio / Website" placeholder="johndoe.com" value={info.website} onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
          <Input label="GitHub" placeholder="github.com/johndoe" value={info.github} onChange={(e) => updatePersonalInfo({ github: e.target.value })} />
          <Input label="Twitter / X" placeholder="twitter.com/johndoe" value={info.twitter} onChange={(e) => updatePersonalInfo({ twitter: e.target.value })} />
        </div>
      </div>
    </div>
  );
}
