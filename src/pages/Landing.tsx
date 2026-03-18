import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiLayout, FiFileText, FiCheck, FiStar,
  FiUsers, FiTarget, FiShield, FiTrendingUp, FiDownload, FiEdit3,
  FiAward, FiGlobe, FiChevronDown, FiMenu, FiX, FiZap
} from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      <Navbar navigate={navigate} />
      <HeroSection navigate={navigate} />
      <LogoBar />
      <FeaturesSection />
      <HowItWorksSection />
      <WhoIsItForSection />
      <WhyUseItSection />
      <TestimonialsSection />
      <PricingSection navigate={navigate} />
      <FaqSection />
      <CtaSection navigate={navigate} />
      <Footer />
    </div>
  );
}

function Navbar({ navigate }: { navigate: (path: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-sm">A</div>
          <span className="font-bold text-xl tracking-tight text-slate-900">AuraCV</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition">Features</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition">How it works</a>
          <a href="#for-who" className="hover:text-slate-900 transition">Who it's for</a>
          <a href="#pricing" className="hover:text-slate-900 transition">Pricing</a>
          <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/app')} className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition flex items-center gap-2">
            Get Started <FiArrowRight />
          </button>
          <button className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {[['#features','Features'],['#how-it-works','How it works'],['#for-who',"Who it's for"],['#pricing','Pricing'],['#faq','FAQ']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-slate-700 hover:text-slate-900 py-1">{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="pt-36 pb-28 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold border border-slate-200 mb-8">
            <FiZap className="text-slate-500" /> Free resume builder — no account needed
          </span>
        </motion.div>
        <motion.h1
          initial="hidden" animate="show" variants={fadeUp} custom={1}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.0] mb-7"
        >
          Build a resume<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            that gets you hired.
          </span>
        </motion.h1>
        <motion.p
          initial="hidden" animate="show" variants={fadeUp} custom={2}
          className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A professional resume builder with beautiful templates, real-time preview, and instant PDF export. Go from blank page to job-ready in minutes.
        </motion.p>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/app')}
            className="px-9 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-900/10"
          >
            Start Building Free <FiArrowRight />
          </button>
          <a href="#how-it-works" className="px-9 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition">
            See How It Works <FiChevronDown />
          </a>
        </motion.div>
        <motion.p initial="hidden" animate="show" variants={fadeUp} custom={4} className="mt-6 text-sm text-slate-400">
          No account required. Your data stays in your browser.
        </motion.p>
      </div>
    </section>
  );
}

function LogoBar() {
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Stripe', 'Airbnb'];
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">Trusted by candidates targeting top companies</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {companies.map((c) => <span key={c} className="text-slate-300 font-bold text-lg tracking-tight">{c}</span>)}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: <FiLayout className="text-blue-500" />, title: 'Real-time Preview', desc: 'See your resume update live as you type. What you see is exactly what gets exported.' },
    { icon: <FiFileText className="text-emerald-500" />, title: 'ATS-Optimized Format', desc: 'Download a clean, machine-readable PDF that passes Applicant Tracking Systems with ease.' },
    { icon: <FiEdit3 className="text-violet-500" />, title: 'Full Customization', desc: 'Choose from multiple fonts, theme colors, and 10 layout templates to match your personal brand.' },
    { icon: <FiShield className="text-rose-500" />, title: 'Privacy First', desc: 'Your data never leaves your browser. No accounts, no servers, no data collection — ever.' },
    { icon: <FiDownload className="text-amber-500" />, title: 'Instant PDF Export', desc: 'One click to download a pixel-perfect, print-ready PDF. No watermarks, no limits.' },
    { icon: <FiTrendingUp className="text-cyan-500" />, title: '10 Professional Templates', desc: 'Classic, Modern, Executive, Minimal, Sidebar and more — switch between them instantly.' },
  ];
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Features</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">Everything you need to land the job</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">A complete toolkit built for modern job seekers — from first draft to final download.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
              className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg hover:border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Fill in your details', desc: 'Walk through our guided 10-step editor. Add your experience, education, skills, and more.' },
    { num: '02', title: 'Choose your template', desc: 'Pick from 10 professionally designed templates and customize fonts, colors, and layout.' },
    { num: '03', title: 'Preview in real time', desc: 'See every change reflected instantly on the live preview panel on the right.' },
    { num: '04', title: 'Export & apply', desc: 'Download a pixel-perfect PDF with one click. Your resume is ready to send to recruiters.' },
  ];
  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">From blank page to hired — in 4 steps</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">No guesswork. No templates that look like everyone else's. Just a clean, guided process.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
              className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-4xl font-black text-slate-100 shrink-0 leading-none">{s.num}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoIsItForSection() {
  const personas = [
    { icon: <FiUsers className="text-blue-500 text-2xl" />, title: 'Recent Graduates', desc: 'Just finished school? Present your education, projects, and skills in the most compelling way — even with limited experience.' },
    { icon: <FiTrendingUp className="text-emerald-500 text-2xl" />, title: 'Career Changers', desc: 'Pivoting to a new industry? Reframe your existing experience to match your target role and highlight transferable skills.' },
    { icon: <FiAward className="text-violet-500 text-2xl" />, title: 'Senior Professionals', desc: 'With years of experience, the challenge is what to leave out. Craft a focused, executive-level resume that commands attention.' },
    { icon: <FiGlobe className="text-amber-500 text-2xl" />, title: 'International Job Seekers', desc: 'Applying across borders? Our ATS-optimized format is recognized globally and follows international resume conventions.' },
    { icon: <FiTarget className="text-rose-500 text-2xl" />, title: 'Freelancers & Consultants', desc: 'Showcase your diverse project portfolio and client work in a structured, professional format that highlights your expertise.' },
    { icon: <FiDownload className="text-cyan-500 text-2xl" />, title: 'Active Job Seekers', desc: 'Applying to multiple roles? Quickly iterate on your resume for each application and export instantly.' },
  ];
  return (
    <section id="for-who" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Who It's For</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">Built for every stage of your career</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Whether you're just starting out or a seasoned executive, AuraCV adapts to your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <motion.div key={p.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i * 0.4}
              className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4">{p.icon}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUseItSection() {
  const reasons = [
    { title: 'ATS-Friendly by Design', desc: 'Our resume format is engineered to pass automated screening systems used by 99% of Fortune 500 companies.' },
    { title: 'Beautiful, Professional Templates', desc: '10 hand-crafted templates — from minimal to bold — so your resume looks as good as your experience.' },
    { title: 'No Bloat, No Subscriptions', desc: 'Free to use. No hidden paywalls, no forced sign-ups. Your resume is yours, always.' },
    { title: 'Instant, Professional Results', desc: 'Go from zero to a polished, export-ready resume in under 15 minutes. No design skills required.' },
  ];
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Why AuraCV</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 leading-tight">Not just another resume builder.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Most resume builders give you a template and leave you to figure out the rest. AuraCV is different — it's a guided, structured tool that helps you communicate your value clearly and confidently.
            </p>
            <div className="flex flex-col gap-4">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck className="text-blue-400 text-xs" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-0.5">{r.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '10x', label: 'Faster than writing from scratch' },
              { value: '95%', label: 'ATS pass rate on standard formats' },
              { value: '15min', label: 'Average time to a complete resume' },
              { value: '100%', label: 'Free, no account required' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Tolu A.', role: 'Recent Computer Science graduate', text: 'I had no idea how to format my CV properly. AuraCV made it so simple — I just filled in my details and it looked professional instantly. Got my first interview within 2 weeks.' },
    { name: 'Blessing O.', role: 'Nursing graduate, job hunting', text: 'I was using Word and it always looked messy. This is so much cleaner. I downloaded my PDF and it looked exactly like the preview. Really happy with it.' },
    { name: 'Marcus T.', role: 'Switched from retail to IT support', text: 'I was nervous about changing careers but the template helped me lay out my transferable skills properly. Already had a callback from a company I really wanted.' },
    { name: 'Aisha M.', role: 'Final year Business student', text: 'My old CV was all over the place. AuraCV helped me organise everything neatly. The live preview is the best part — you can see changes as you type.' },
    { name: 'Daniel F.', role: 'Freelance graphic designer', text: 'I needed something clean and minimal that let my work speak for itself. The Minimal template was perfect. Took me about 20 minutes to have a complete CV ready.' },
    { name: 'Chisom E.', role: 'Graduate looking for first role', text: 'I was embarrassed by my old CV. A friend recommended AuraCV and honestly it changed everything. It looks so professional and I didn\'t need any design skills at all.' },
  ];
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">Real results from real people</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Join thousands of professionals who've used AuraCV to land their next role.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <FiStar key={j} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{t.name[0]}</div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">Simple, honest pricing</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">No tricks. No paywalls mid-flow. Everything you need is free.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl border-2 border-slate-100 bg-white">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Free</h3>
            <div className="text-4xl font-black text-slate-900 mb-1">$0</div>
            <p className="text-slate-400 text-sm mb-6">Forever free. No credit card.</p>
            <ul className="space-y-3 mb-8">
              {['Full resume editor (10 steps)','10 professional templates','PDF & image export','All fonts & colors','Local browser storage','Unlimited edits'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600"><FiCheck className="text-emerald-500 shrink-0" /> {f}</li>
              ))}
            </ul>
            <button onClick={() => navigate('/app')} className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-50 transition">Get Started Free</button>
          </div>
          <div className="p-8 rounded-2xl border-2 border-slate-900 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">Coming Soon</div>
            <h3 className="text-xl font-bold mb-1">Pro</h3>
            <div className="text-4xl font-black mb-1">$9<span className="text-lg font-normal text-slate-400">/mo</span></div>
            <p className="text-slate-400 text-sm mb-6">For serious job seekers.</p>
            <ul className="space-y-3 mb-8">
              {['Everything in Free','Cloud sync & multi-device','Multiple resume versions','Cover letter builder','LinkedIn profile optimizer','Priority support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-300"><FiCheck className="text-blue-400 shrink-0" /> {f}</li>
              ))}
            </ul>
            <button disabled className="w-full py-3 rounded-xl bg-white/10 text-white/50 font-bold cursor-not-allowed">Notify Me</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    { q: 'Is my data private?', a: 'Yes. All your resume data is stored locally in your browser using localStorage. Nothing is ever sent to any server.' },
    { q: 'Will my resume pass ATS systems?', a: 'Our format is specifically designed to be ATS-friendly — clean structure, standard fonts, no tables or graphics that confuse parsers.' },
    { q: 'Do I need to create an account?', a: 'No. AuraCV works entirely without an account. Just open the app and start building. Your progress is auto-saved to your browser.' },
    { q: 'What file formats can I export?', a: 'You can export your resume as a high-quality PDF via the Download PDF button. PNG export is also available.' },
    { q: 'Can I customize the resume design?', a: 'Yes. Step 9 in the editor lets you choose from multiple theme colors, font families, and layout options. Changes reflect instantly in the live preview.' },
    { q: 'How many templates are available?', a: 'There are 10 templates: Classic, Executive, Minimal, Sidebar, Modern, Compact, Elegant, Bold, Timeline, and Professional. You can switch between them instantly from the dashboard.' },
  ];
  return (
    <section id="faq" className="py-24 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">Common questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer">
              <summary className="font-semibold text-slate-900 text-base list-none flex justify-between items-center gap-4">
                {f.q}
                <FiChevronDown className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-slate-500 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">Your next job starts<br />with a great resume.</h2>
          <p className="text-xl text-slate-500 mb-10">Build yours in minutes. Free, forever.</p>
          <button onClick={() => navigate('/app')} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center gap-3 mx-auto hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/10">
            Start Building Now <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 py-10 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-slate-900 text-white rounded-md flex items-center justify-center font-black text-xs">A</div>
          <span className="font-bold text-slate-900">AuraCV</span>
        </div>
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} AuraCV. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#features" className="hover:text-slate-700 transition">Features</a>
          <a href="#pricing" className="hover:text-slate-700 transition">Pricing</a>
          <a href="#faq" className="hover:text-slate-700 transition">FAQ</a>
        </div>
      </div>
    </footer>
  );
}
