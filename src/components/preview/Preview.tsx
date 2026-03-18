import { useResume } from '../../hooks/useResume';
import { FiPhone, FiMail, FiMapPin, FiLinkedin, FiGithub, FiGlobe, FiTwitter } from 'react-icons/fi';
import type { ResumeData, Experience, Project, Education, Certification, Additional } from '../../types/resume';

// ─── utils ──────────────────────────────────────────────────────────────────
function rgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─── contact chip ───────────────────────────────────────────────────────────
function CI({ icon, text, link, light }: { icon: React.ReactNode; text: string; link?: string; light?: boolean }) {
  if (!text) return null;
  const cls = `flex items-center gap-1 text-[10.5px] ${light ? 'text-white/80' : 'text-zinc-500'}`;
  const inner = <span className={cls}><span className="opacity-60 text-[10px]">{icon}</span>{text}</span>;
  return link
    ? <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noreferrer" className="hover:opacity-75 transition">{inner}</a>
    : <>{inner}</>;
}

// ─── section heading ────────────────────────────────────────────────────────
function H({ title, color, v = 'u' }: { title: string; color: string; v?: 'u' | 'bar' | 'dot' }) {
  if (v === 'bar') return (
    <div className="flex items-center gap-2 mb-2.5">
      <div className="w-1 h-4 rounded" style={{ backgroundColor: color }} />
      <h2 className="text-[12px] font-black uppercase tracking-widest text-zinc-800">{title}</h2>
    </div>
  );
  if (v === 'dot') return (
    <div className="flex items-center gap-2 mb-2.5">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <h2 className="text-[11.5px] font-bold uppercase tracking-widest text-zinc-700">{title}</h2>
      <div className="flex-1 h-px bg-zinc-100" />
    </div>
  );
  return (
    <h2 className="text-[12.5px] font-bold uppercase tracking-widest border-b-2 mb-2.5 pb-1"
      style={{ borderColor: rgba(color, 0.25), color }}>{title}</h2>
  );
}

// ─── single section renderer ────────────────────────────────────────────────
function Sec({ id, data, color, v = 'u' }: { id: string; data: ResumeData; color: string; v?: 'u' | 'bar' | 'dot' }) {
  switch (id) {
    case 'summary':
      if (!data.summary && !data.coreCompetencies) return null;
      return (
        <section key="s">
          <H title="Summary" color={color} v={v} />
          {data.summary && <p className="text-[11px] leading-relaxed text-zinc-700 whitespace-pre-wrap mb-2">{data.summary}</p>}
          {data.coreCompetencies && <div className="bg-zinc-50 border border-zinc-100 rounded p-2"><p className="text-[10.5px] text-zinc-600 whitespace-pre-wrap leading-relaxed">{data.coreCompetencies}</p></div>}
        </section>
      );
    case 'experience':
      if (!data.experiences.length) return null;
      return (
        <section key="e">
          <H title="Experience" color={color} v={v} />
          <div className="flex flex-col gap-3">
            {data.experiences.map((e: Experience) => (
              <div key={e.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-zinc-900">{e.role}</span>
                  <span className="text-[10px] text-zinc-400 whitespace-nowrap">{e.startDate} – {e.isCurrent ? 'Present' : e.endDate}</span>
                </div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold" style={{ color }}>{e.company}</span>
                  <span className="text-zinc-400 italic">{e.location}</span>
                </div>
                {e.description && <div className="text-[11px] text-zinc-700 whitespace-pre-wrap pl-3 border-l-2 leading-relaxed" style={{ borderColor: rgba(color, 0.25) }}>{e.description}</div>}
                {e.technologies && <p className="text-[10px] text-zinc-400 mt-1"><span className="text-zinc-600 font-medium">Tech:</span> {e.technologies}</p>}
              </div>
            ))}
          </div>
        </section>
      );
    case 'projects':
      if (!data.projects.length) return null;
      return (
        <section key="p">
          <H title="Projects" color={color} v={v} />
          <div className="flex flex-col gap-2.5">
            {data.projects.map((p: Project) => (
              <div key={p.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-zinc-900">{p.name}{p.role && <span className="font-normal text-zinc-400 text-[10px] ml-1">({p.role})</span>}</span>
                  {p.link && <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noreferrer" className="text-[10px] hover:underline" style={{ color }}>{p.link.replace(/^https?:\/\//, '')}</a>}
                </div>
                {p.description && <p className="text-[11px] text-zinc-700 whitespace-pre-wrap leading-relaxed">{p.description}</p>}
                {p.technologies && <p className="text-[10px] text-zinc-400 mt-0.5"><span className="text-zinc-600 font-medium">Tech:</span> {p.technologies}</p>}
              </div>
            ))}
          </div>
        </section>
      );
    case 'skills':
      if (!data.skills.hard && !data.skills.soft && !data.skills.languages) return null;
      return (
        <section key="sk">
          <H title="Skills & Languages" color={color} v={v} />
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {data.skills.hard && <div><p className="font-semibold text-[9.5px] text-zinc-400 uppercase tracking-wider mb-0.5">Technical</p><p className="text-zinc-700 leading-relaxed">{data.skills.hard}</p></div>}
            {data.skills.soft && <div><p className="font-semibold text-[9.5px] text-zinc-400 uppercase tracking-wider mb-0.5">Soft Skills</p><p className="text-zinc-700 leading-relaxed">{data.skills.soft}</p></div>}
            {data.skills.languages && <div className="col-span-2"><p className="font-semibold text-[9.5px] text-zinc-400 uppercase tracking-wider mb-0.5">Languages</p><p className="text-zinc-700">{data.skills.languages}</p></div>}
          </div>
        </section>
      );
    case 'education':
      if (!data.educations.length) return null;
      return (
        <section key="ed">
          <H title="Education" color={color} v={v} />
          <div className="flex flex-col gap-2">
            {data.educations.map((e: Education) => (
              <div key={e.id} className="flex justify-between items-start break-inside-avoid">
                <div>
                  <p className="font-bold text-[12px] text-zinc-900">{e.degree} in {e.field}</p>
                  <p className="text-[11px] font-medium" style={{ color }}>{e.institution}</p>
                  {e.gpa && <p className="text-[10px] text-zinc-400">GPA: {e.gpa}</p>}
                  {e.coursework && <p className="text-[10px] text-zinc-400">Coursework: {e.coursework}</p>}
                </div>
                <p className="text-[10px] text-zinc-400 whitespace-nowrap ml-4">{e.startDate} – {e.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case 'certifications':
      if (!data.certifications.length) return null;
      return (
        <section key="c">
          <H title="Certifications & Awards" color={color} v={v} />
          <div className="flex flex-col gap-2">
            {data.certifications.map((c: Certification) => (
              <div key={c.id} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <p className="font-bold text-[12px] text-zinc-900">{c.name}</p>
                  <p className="text-[11px]" style={{ color }}>{c.issuer}</p>
                  {c.description && <p className="text-[10px] text-zinc-400">{c.description}</p>}
                </div>
                <p className="text-[10px] text-zinc-400 whitespace-nowrap ml-4">{c.date}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case 'additional':
      if (!data.additional.length) return null;
      return (
        <section key="a">
          <H title="Additional Experience" color={color} v={v} />
          <div className="flex flex-col gap-2">
            {data.additional.map((a: Additional) => (
              <div key={a.id} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <p className="font-bold text-[12px] text-zinc-900">{a.role}</p>
                  <p className="text-[11px]" style={{ color }}>{a.organization}</p>
                </div>
                <p className="text-[10px] text-zinc-400 whitespace-nowrap ml-4">{a.duration}</p>
              </div>
            ))}
          </div>
        </section>
      );
    default: return null;
  }
}

function AllSections({ data, color, v = 'u' }: { data: ResumeData; color: string; v?: 'u' | 'bar' | 'dot' }) {
  return <div className="flex flex-col gap-4">{data.design.layout.map(id => <Sec key={id} id={id} data={data} color={color} v={v} />)}</div>;
}

// ─── 1. Classic ─────────────────────────────────────────────────────────────
function T1({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] p-[18mm] box-border relative shadow-md border border-zinc-200" style={{ fontFamily: ff }}>
      <div className="absolute top-0 left-0 w-full h-[3mm]" style={{ backgroundColor: c }} />
      <header className="mb-5 pb-4 border-b border-zinc-100 flex gap-5 items-center">
        {i.photo && <img src={i.photo} alt="" className="w-20 h-20 rounded-xl object-cover border-2 shrink-0" style={{ borderColor: c }} />}
        <div className="flex-1">
          <h1 className="text-[26px] font-black uppercase tracking-tight mb-1.5" style={{ color: c }}>{i.fullName || 'YOUR NAME'}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
            <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
            <CI icon={<FiMapPin />} text={i.location} />
            <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
            <CI icon={<FiGlobe />} text={i.website} link={i.website} />
            <CI icon={<FiGithub />} text={i.github} link={i.github} />
            <CI icon={<FiTwitter />} text={i.twitter} link={i.twitter} />
          </div>
        </div>
      </header>
      <AllSections data={data} color={c} />
    </div>
  );
}

// ─── 2. Executive ───────────────────────────────────────────────────────────
function T2({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] box-border shadow-md border border-zinc-200" style={{ fontFamily: ff }}>
      <div className="px-[18mm] py-[10mm]" style={{ backgroundColor: c }}>
        <h1 className="text-[28px] font-black uppercase tracking-wide text-white mb-1.5">{i.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} light />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} light />
          <CI icon={<FiMapPin />} text={i.location} light />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} light />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} light />
          <CI icon={<FiGithub />} text={i.github} link={i.github} light />
        </div>
      </div>
      <div className="px-[18mm] py-[10mm]"><AllSections data={data} color={c} /></div>
    </div>
  );
}

// ─── 3. Minimal ─────────────────────────────────────────────────────────────
function T3({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] p-[20mm] box-border shadow-md border border-zinc-200" style={{ fontFamily: ff }}>
      <header className="mb-8">
        <h1 className="text-[30px] font-light tracking-[0.12em] uppercase text-zinc-900 mb-2">{i.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mb-4">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
          <CI icon={<FiMapPin />} text={i.location} />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} />
          <CI icon={<FiGithub />} text={i.github} link={i.github} />
        </div>
        <div className="h-px bg-zinc-100" />
      </header>
      <AllSections data={data} color={c} />
    </div>
  );
}

// ─── 4. Sidebar ─────────────────────────────────────────────────────────────
function T4({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] box-border shadow-md border border-zinc-200 flex" style={{ fontFamily: ff }}>
      <div className="w-[60mm] min-h-full p-[8mm] flex flex-col gap-4" style={{ backgroundColor: c }}>
        {i.photo && <img src={i.photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/30 mx-auto" />}
        <div>
          <h1 className="text-[16px] font-black uppercase tracking-wide text-white leading-tight mb-2">{i.fullName || 'YOUR NAME'}</h1>
          <div className="flex flex-col gap-1">
            <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} light />
            <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} light />
            <CI icon={<FiMapPin />} text={i.location} light />
            <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} light />
            <CI icon={<FiGlobe />} text={i.website} link={i.website} light />
            <CI icon={<FiGithub />} text={i.github} link={i.github} light />
          </div>
        </div>
        {['summary', 'skills', 'education', 'certifications'].map(id => (
          <div key={id} className="[&_h2]:!text-white [&_h2]:!border-white/20 [&_p]:!text-white/80 [&_.text-zinc-700]:!text-white/80 [&_.text-zinc-400]:!text-white/60 [&_.text-zinc-900]:!text-white [&_.bg-zinc-50]:!bg-white/10 [&_.border-zinc-100]:!border-white/20">
            <Sec id={id} data={data} color="white" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-[8mm] flex flex-col gap-4">
        {['experience', 'projects', 'additional'].map(id => <Sec key={id} id={id} data={data} color={c} />)}
      </div>
    </div>
  );
}

// ─── 5. Modern ──────────────────────────────────────────────────────────────
function T5({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] p-[18mm] box-border shadow-md border border-zinc-200" style={{ fontFamily: ff }}>
      <header className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-[28px] font-black text-zinc-900 leading-none mb-1.5">{i.fullName || 'YOUR NAME'}</h1>
            <div className="h-1 w-14 rounded" style={{ backgroundColor: c }} />
          </div>
          {i.photo && <img src={i.photo} alt="" className="w-16 h-16 rounded-lg object-cover" />}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
          <CI icon={<FiMapPin />} text={i.location} />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} />
          <CI icon={<FiGithub />} text={i.github} link={i.github} />
        </div>
      </header>
      <AllSections data={data} color={c} v="bar" />
    </div>
  );
}

// ─── 6. Compact ─────────────────────────────────────────────────────────────
function T6({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] p-[13mm] box-border shadow-md border border-zinc-200 text-[10.5px]" style={{ fontFamily: ff }}>
      <header className="mb-3 pb-2 border-b-2" style={{ borderColor: c }}>
        <h1 className="text-[20px] font-black uppercase tracking-tight" style={{ color: c }}>{i.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
          <CI icon={<FiMapPin />} text={i.location} />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} />
          <CI icon={<FiGithub />} text={i.github} link={i.github} />
        </div>
      </header>
      <AllSections data={data} color={c} v="dot" />
    </div>
  );
}

// ─── 7. Elegant ─────────────────────────────────────────────────────────────
function T7({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const elegantFont = ff.includes('serif') ? ff : '"Playfair Display", serif';
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] p-[20mm] box-border shadow-md border border-zinc-200" style={{ fontFamily: elegantFont }}>
      <header className="text-center mb-7 pb-5 border-b border-zinc-200">
        {i.photo && <img src={i.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2" style={{ borderColor: c }} />}
        <h1 className="text-[28px] font-bold tracking-wide text-zinc-900 mb-1">{i.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
          <CI icon={<FiMapPin />} text={i.location} />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} />
          <CI icon={<FiGithub />} text={i.github} link={i.github} />
        </div>
      </header>
      <AllSections data={data} color={c} />
    </div>
  );
}

// ─── 8. Bold ────────────────────────────────────────────────────────────────
function T8({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] box-border shadow-md border border-zinc-200" style={{ fontFamily: ff }}>
      <div className="px-[18mm] pt-[12mm] pb-[8mm]" style={{ backgroundColor: rgba(c, 0.07) }}>
        <h1 className="text-[32px] font-black uppercase tracking-tight text-zinc-900 mb-1">{i.fullName || 'YOUR NAME'}</h1>
        <div className="h-1.5 w-20 rounded mb-3" style={{ backgroundColor: c }} />
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
          <CI icon={<FiMapPin />} text={i.location} />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} />
          <CI icon={<FiGithub />} text={i.github} link={i.github} />
        </div>
      </div>
      <div className="px-[18mm] py-[10mm]"><AllSections data={data} color={c} v="bar" /></div>
    </div>
  );
}

// ─── 9. Timeline ────────────────────────────────────────────────────────────
function T9({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] p-[18mm] box-border shadow-md border border-zinc-200" style={{ fontFamily: ff }}>
      <header className="mb-5 pb-4 border-b-2" style={{ borderColor: c }}>
        <h1 className="text-[26px] font-black uppercase tracking-tight mb-1" style={{ color: c }}>{i.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
          <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
          <CI icon={<FiMapPin />} text={i.location} />
          <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
          <CI icon={<FiGlobe />} text={i.website} link={i.website} />
          <CI icon={<FiGithub />} text={i.github} link={i.github} />
        </div>
      </header>
      {data.summary && <div className="mb-4"><H title="Summary" color={c} v="bar" /><p className="text-[11px] text-zinc-700 leading-relaxed whitespace-pre-wrap">{data.summary}</p></div>}
      {data.experiences.length > 0 && (
        <div className="mb-4">
          <H title="Experience" color={c} v="bar" />
          <div className="relative pl-5 border-l-2" style={{ borderColor: rgba(c, 0.3) }}>
            {data.experiences.map((e: Experience) => (
              <div key={e.id} className="mb-3 relative">
                <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: c }} />
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-zinc-900">{e.role}</span>
                  <span className="text-[10px] text-zinc-400">{e.startDate} – {e.isCurrent ? 'Present' : e.endDate}</span>
                </div>
                <span className="text-[11px] font-medium" style={{ color: c }}>{e.company}</span>
                {e.description && <p className="text-[11px] text-zinc-600 whitespace-pre-wrap mt-0.5 leading-relaxed">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {['projects', 'skills', 'education', 'certifications', 'additional'].map(id => <Sec key={id} id={id} data={data} color={c} v="bar" />)}
    </div>
  );
}

// ─── 10. Professional ───────────────────────────────────────────────────────
function T10({ data }: { data: ResumeData }) {
  const { themeColor: c, fontFamily: ff } = data.design;
  const i = data.personalInfo;
  return (
    <div id="resume-preview-content" className="bg-white w-[210mm] min-h-[297mm] box-border shadow-md border border-zinc-200 flex" style={{ fontFamily: ff }}>
      <div className="w-[8mm] min-h-full shrink-0" style={{ backgroundColor: c }} />
      <div className="flex-1">
        <div className="px-[14mm] py-[10mm] border-b border-zinc-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[26px] font-black text-zinc-900 uppercase tracking-tight">{i.fullName || 'YOUR NAME'}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                <CI icon={<FiMail />} text={i.email} link={`mailto:${i.email}`} />
                <CI icon={<FiPhone />} text={i.phone} link={`tel:${i.phone}`} />
                <CI icon={<FiMapPin />} text={i.location} />
                <CI icon={<FiLinkedin />} text={i.linkedin} link={i.linkedin} />
                <CI icon={<FiGlobe />} text={i.website} link={i.website} />
                <CI icon={<FiGithub />} text={i.github} link={i.github} />
              </div>
            </div>
            {i.photo && <img src={i.photo} alt="" className="w-16 h-16 rounded object-cover border-2 ml-4" style={{ borderColor: c }} />}
          </div>
        </div>
        <div className="px-[14mm] py-[10mm]"><AllSections data={data} color={c} v="dot" /></div>
      </div>
    </div>
  );
}

// ─── main export ────────────────────────────────────────────────────────────
export default function Preview() {
  const { data } = useResume();
  switch (data.design.template) {
    case 'executive':    return <T2 data={data} />;
    case 'minimal':      return <T3 data={data} />;
    case 'sidebar':      return <T4 data={data} />;
    case 'modern':       return <T5 data={data} />;
    case 'compact':      return <T6 data={data} />;
    case 'elegant':      return <T7 data={data} />;
    case 'bold':         return <T8 data={data} />;
    case 'timeline':     return <T9 data={data} />;
    case 'professional': return <T10 data={data} />;
    default:             return <T1 data={data} />;
  }
}
