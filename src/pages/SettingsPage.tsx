import { FiArrowLeft, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../hooks/useResume';

interface Props { onBack: () => void; }

export default function SettingsPage({ onBack }: Props) {
  const { data } = useResume();

  const clearData = () => {
    if (confirm('This will permanently delete all your resume data. Are you sure?')) {
      localStorage.removeItem('resume-storage');
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium mb-6 transition">
          <FiArrowLeft /> Back to Editor
        </button>

        <h1 className="text-2xl font-black text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-400 text-sm mb-8">Manage your app preferences and data.</p>

        {/* Storage */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Storage</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Auto-save</p>
                <p className="text-xs text-slate-400 mt-0.5">Your resume is automatically saved to your browser's localStorage after every change.</p>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
                <FiCheckCircle /> Active
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Resume data</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {data.personalInfo.fullName ? `Saved as "${data.personalInfo.fullName}"` : 'No name set yet'}
                </p>
              </div>
              <button onClick={clearData} className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition">
                <FiTrash2 /> Clear All Data
              </button>
            </div>
          </div>
        </div>

        {/* App info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">About</h2>
          </div>
          <div className="p-6 space-y-3 text-sm">
            {[
              ['App', 'AuraCV — AI Resume Builder'],
              ['Version', '1.0.0'],
              ['Theme', 'Light mode'],
              ['Framework', 'React 19 + Vite 8 + Tailwind 4'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                <span className="text-slate-400 text-xs">{k}</span>
                <span className="text-slate-700 font-medium text-xs">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
