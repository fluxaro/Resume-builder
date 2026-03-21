import React, { useState, useRef, useEffect } from 'react';
import { FiLayout, FiSettings, FiDownload, FiImage, FiMenu, FiX, FiCheckCircle, FiChevronLeft, FiChevronRight, FiEye, FiEdit3 } from 'react-icons/fi';
import Editor from '../components/editor/Editor';
import Preview from '../components/preview/Preview';
import SettingsPage from './SettingsPage';
import TemplatesPage from './TemplatesPage';
import { useResume } from '../hooks/useResume';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

type Panel = 'editor' | 'settings' | 'templates';
type MobileTab = 'edit' | 'preview';

const TEMPLATE_IDS = ['classic','executive','minimal','sidebar','modern','compact','elegant','bold','timeline','professional'];
const TEMPLATE_NAMES: Record<string, string> = {
  classic:'Classic', executive:'Executive', minimal:'Minimal', sidebar:'Sidebar',
  modern:'Modern', compact:'Compact', elegant:'Elegant', bold:'Bold',
  timeline:'Timeline', professional:'Professional',
};

export default function Dashboard() {
  const [panel, setPanel] = useState<Panel>('editor');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('edit');
  const [exporting, setExporting] = useState<'pdf' | 'img' | null>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.6);
  const { data, updateDesign } = useResume();
  const activeTemplate = data.design.template || 'classic';

  // Dynamic preview scaling based on container width
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      const containerW = entry.contentRect.width;
      // A4 width in px at 96dpi ≈ 794px
      const scale = Math.min((containerW - 32) / 794, 1);
      setPreviewScale(Math.max(scale, 0.3));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const captureCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const el = document.getElementById('resume-preview-content');
    if (!el) {
      alert('Preview not found. Switch to the Editor tab first.');
      return null;
    }

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (node) => node.tagName === 'SCRIPT' || node.tagName === 'NOSCRIPT',
        onclone: (clonedDoc) => {
          // Remove ALL SVGs — react-icons SVGs trigger oklch parsing in html2canvas
          // The resume content is text-based so icons are decorative only
          clonedDoc.querySelectorAll('svg').forEach(n => n.remove());

          // Remove ALL external/internal stylesheets — eliminates every oklch reference
          clonedDoc.querySelectorAll('link[rel="stylesheet"], style').forEach(n => n.remove());

          // 2. Inject a minimal safe CSS reset that covers what the resume needs.
          //    All layout classes (flex, grid, gap, padding, font-size) are re-declared
          //    using plain rgb/hex — no oklch anywhere.
          const css = `
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, Helvetica, sans-serif; background: #fff; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-1 { flex: 1 1 0%; }
            .flex-wrap { flex-wrap: wrap; }
            .shrink-0 { flex-shrink: 0; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .col-span-2 { grid-column: span 2 / span 2; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .items-baseline { align-items: baseline; }
            .items-end { align-items: flex-end; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            .text-center { text-align: center; }
            .relative { position: relative; }
            .absolute { position: absolute; }
            .inset-0 { top:0;right:0;bottom:0;left:0; }
            .overflow-hidden { overflow: hidden; }
            .break-inside-avoid { break-inside: avoid; }
            .whitespace-pre-wrap { white-space: pre-wrap; }
            .whitespace-nowrap { white-space: nowrap; }
            .italic { font-style: italic; }
            .uppercase { text-transform: uppercase; }
            .underline { text-decoration: underline; }
            .rounded { border-radius: 4px; }
            .rounded-full { border-radius: 9999px; }
            .rounded-xl { border-radius: 12px; }
            .rounded-lg { border-radius: 8px; }
            .border { border-width: 1px; border-style: solid; }
            .border-b { border-bottom-width: 1px; border-bottom-style: solid; }
            .border-l-2 { border-left-width: 2px; border-left-style: solid; }
            .border-b-2 { border-bottom-width: 2px; border-bottom-style: solid; }
            .border-2 { border-width: 2px; border-style: solid; }
            .object-cover { object-fit: cover; }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            .min-h-full { min-height: 100%; }
            .leading-none { line-height: 1; }
            .leading-tight { line-height: 1.25; }
            .leading-snug { line-height: 1.375; }
            .leading-relaxed { line-height: 1.625; }
            .transition { transition: none; }
            .hover\\:opacity-75:hover { opacity: 0.75; }
            /* spacing */
            .gap-1 { gap: 4px; } .gap-1\\.5 { gap: 6px; } .gap-2 { gap: 8px; }
            .gap-2\\.5 { gap: 10px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
            .gap-5 { gap: 20px; } .gap-x-4 { column-gap: 16px; } .gap-x-5 { column-gap: 20px; }
            .gap-y-1 { row-gap: 4px; } .gap-y-1\\.5 { row-gap: 6px; }
            .mb-1 { margin-bottom: 4px; } .mb-1\\.5 { margin-bottom: 6px; }
            .mb-2 { margin-bottom: 8px; } .mb-2\\.5 { margin-bottom: 10px; }
            .mb-3 { margin-bottom: 12px; } .mb-4 { margin-bottom: 16px; }
            .mb-5 { margin-bottom: 20px; } .mb-6 { margin-bottom: 24px; }
            .mb-7 { margin-bottom: 28px; } .mb-8 { margin-bottom: 32px; }
            .mt-0\\.5 { margin-top: 2px; } .mt-1 { margin-top: 4px; }
            .mt-1\\.5 { margin-top: 6px; } .mt-2 { margin-top: 8px; }
            .ml-4 { margin-left: 16px; } .ml-5 { margin-left: 20px; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .p-2 { padding: 8px; } .p-3 { padding: 12px; }
            .pb-1 { padding-bottom: 4px; } .pb-2 { padding-bottom: 8px; }
            .pb-4 { padding-bottom: 16px; } .pb-5 { padding-bottom: 20px; }
            .pt-2 { padding-top: 8px; } .pt-3 { padding-top: 12px; }
            .pl-3 { padding-left: 12px; } .pl-5 { padding-left: 20px; }
            /* font sizes */
            .text-\\[9\\.5px\\] { font-size: 9.5px; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[10\\.5px\\] { font-size: 10.5px; }
            .text-\\[11px\\] { font-size: 11px; }
            .text-\\[11\\.5px\\] { font-size: 11.5px; }
            .text-\\[12px\\] { font-size: 12px; }
            .text-\\[12\\.5px\\] { font-size: 12.5px; }
            .text-\\[16px\\] { font-size: 16px; }
            .text-\\[20px\\] { font-size: 20px; }
            .text-\\[26px\\] { font-size: 26px; }
            .text-\\[28px\\] { font-size: 28px; }
            .text-\\[30px\\] { font-size: 30px; }
            .text-\\[32px\\] { font-size: 32px; }
            /* font weights */
            .font-light { font-weight: 300; }
            .font-normal { font-weight: 400; }
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            .font-black { font-weight: 900; }
            /* tracking */
            .tracking-tight { letter-spacing: -0.025em; }
            .tracking-wide { letter-spacing: 0.025em; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-widest { letter-spacing: 0.1em; }
            /* colors — safe rgb only */
            .bg-white { background-color: #ffffff; }
            .bg-zinc-50 { background-color: #fafafa; }
            .text-white { color: #ffffff; }
            .text-zinc-400 { color: #a1a1aa; }
            .text-zinc-500 { color: #71717a; }
            .text-zinc-600 { color: #52525b; }
            .text-zinc-700 { color: #3f3f46; }
            .text-zinc-800 { color: #27272a; }
            .text-zinc-900 { color: #18181b; }
            .border-zinc-100 { border-color: #f4f4f5; }
            .border-zinc-200 { border-color: #e4e4e7; }
            .shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            /* sizes */
            .w-1 { width: 4px; } .w-2 { width: 8px; } .w-3 { width: 12px; }
            .w-7 { width: 28px; } .w-8 { width: 32px; } .w-\\[8mm\\] { width: 8mm; }
            .w-\\[60mm\\] { width: 60mm; } .w-\\[210mm\\] { width: 210mm; }
            .w-14 { width: 56px; } .w-16 { width: 64px; } .w-20 { width: 80px; }
            .h-1 { height: 4px; } .h-1\\.5 { height: 6px; } .h-2 { height: 8px; }
            .h-3 { height: 12px; } .h-4 { height: 16px; } .h-px { height: 1px; }
            .h-14 { height: 56px; } .h-16 { height: 64px; } .h-20 { height: 80px; }
            .min-h-\\[297mm\\] { min-height: 297mm; }
            .h-\\[3mm\\] { height: 3mm; }
            /* box */
            .box-border { box-sizing: border-box; }
            /* padding shorthand for resume pages */
            .p-\\[18mm\\] { padding: 18mm; }
            .p-\\[20mm\\] { padding: 20mm; }
            .p-\\[13mm\\] { padding: 13mm; }
            .p-\\[8mm\\] { padding: 8mm; }
            .px-\\[18mm\\] { padding-left: 18mm; padding-right: 18mm; }
            .px-\\[14mm\\] { padding-left: 14mm; padding-right: 14mm; }
            .py-\\[10mm\\] { padding-top: 10mm; padding-bottom: 10mm; }
            .py-\\[12mm\\] { padding-top: 12mm; padding-bottom: 12mm; }
            .py-\\[8mm\\] { padding-top: 8mm; padding-bottom: 8mm; }
            /* rotate for svg */
            .-rotate-90 { transform: rotate(-90deg); }
            /* top/left/right/bottom */
            .top-0 { top: 0; } .left-0 { left: 0; } .right-0 { right: 0; }
            .bottom-0 { bottom: 0; }
            .-left-\\[22px\\] { left: -22px; }
            .top-1 { top: 4px; }
          `;
          const style = clonedDoc.createElement('style');
          style.textContent = css;
          clonedDoc.head.appendChild(style);
        },
      });
      return canvas;
    } catch (e) {
      console.error('html2canvas error:', e);
      throw e;
    }
  };

  const exportToPDF = async () => {
    setExporting('pdf');
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      // Scale image to fit A4
      const imgW = pdfW;
      const imgH = (canvas.height * pdfW) / canvas.width;
      let y = 0;
      // If content is taller than one page, add pages
      if (imgH <= pdfH) {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgW, imgH);
      } else {
        let remaining = imgH;
        while (remaining > 0) {
          pdf.addImage(imgData, 'JPEG', 0, y === 0 ? 0 : -(imgH - remaining), imgW, imgH);
          remaining -= pdfH;
          if (remaining > 0) pdf.addPage();
          y += pdfH;
        }
      }
      pdf.save('resume.pdf');
    } catch (e) {
      console.error('PDF export error:', e);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  };

  const exportToImage = async () => {
    setExporting('img');
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = 'resume.png';
      a.href = url;
      a.click();
    } catch (e) {
      console.error('Image export error:', e);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  };

  const cycleTemplate = (dir: 1 | -1) => {
    const idx = TEMPLATE_IDS.indexOf(activeTemplate);
    const next = TEMPLATE_IDS[(idx + dir + TEMPLATE_IDS.length) % TEMPLATE_IDS.length];
    updateDesign({ template: next });
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 z-40 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="w-7 h-7 bg-slate-900 text-white flex items-center justify-center rounded-lg text-xs font-black">A</div>
          AuraCV
        </div>
        <button onClick={() => setMobileMenuOpen(v => !v)} className="p-2 text-slate-600">
          {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-14 lg:top-0 left-0 w-56 h-[calc(100vh-3.5rem)] lg:h-screen border-r border-slate-100 bg-white flex flex-col justify-between py-5 shrink-0 transition-transform duration-300 z-30`}>
        <div>
          <div className="hidden lg:flex items-center gap-2.5 px-5 mb-8 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-sm">A</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">AuraCV</span>
          </div>
          <nav className="flex flex-col gap-1 px-3">
            <NavItem icon={<FiLayout />} label="Resume Editor" active={panel === 'editor'} onClick={() => { setPanel('editor'); setMobileMenuOpen(false); }} />
            <NavItem icon={<FiLayout />} label="Templates" active={panel === 'templates'} onClick={() => { setPanel('templates'); setMobileMenuOpen(false); }} />
          </nav>
        </div>
        <div className="px-3">
          <NavItem icon={<FiSettings />} label="Settings" active={panel === 'settings'} onClick={() => { setPanel('settings'); setMobileMenuOpen(false); }} />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full pt-14 lg:pt-0">

        {/* Topbar */}
        <header className="h-14 border-b border-slate-100 bg-white flex items-center justify-between px-5 lg:px-7 shrink-0 z-10">
          <div>
            <span className="font-bold text-sm text-slate-900">
              {panel === 'editor' ? 'Resume Editor' : panel === 'templates' ? 'Templates' : 'Settings'}
            </span>
            {panel === 'editor' && (
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium mt-0.5">
                <FiCheckCircle size={10} /> Auto-saved
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportToImage} disabled={exporting !== null}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-50">
              <FiImage size={14} />
              <span className="hidden sm:inline">{exporting === 'img' ? 'Exporting…' : 'PNG'}</span>
            </button>
            <button onClick={exportToPDF} disabled={exporting !== null}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition shadow-sm disabled:opacity-50">
              <FiDownload size={14} />
              <span className="hidden sm:inline">{exporting === 'pdf' ? 'Exporting…' : 'Download PDF'}</span>
            </button>
          </div>
        </header>

        {/* Content */}
        {panel === 'settings' && <SettingsPage onBack={() => setPanel('editor')} />}
        {panel === 'templates' && <TemplatesPage onBack={() => setPanel('editor')} />}

        {panel === 'editor' && (
          <div className="flex-1 flex overflow-hidden lg:flex-row flex-col">

            {/* Mobile tab switcher */}
            <div className="lg:hidden flex border-b border-slate-100 bg-white shrink-0">
              <button
                onClick={() => setMobileTab('edit')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition ${mobileTab === 'edit' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'}`}
              >
                <FiEdit3 size={14} /> Edit
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition ${mobileTab === 'preview' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'}`}
              >
                <FiEye size={14} /> Preview
              </button>
            </div>

            {/* Editor panel */}
            <section className={`w-full lg:w-[45%] lg:flex flex-col border-r border-slate-100 overflow-hidden bg-white ${mobileTab === 'edit' ? 'flex flex-1' : 'hidden'} lg:flex`}>
              <Editor />
            </section>

            {/* Preview panel */}
            <section className={`w-full lg:w-[55%] lg:flex flex-col bg-slate-100 overflow-hidden ${mobileTab === 'preview' ? 'flex flex-1' : 'hidden'} lg:flex`}>
              {/* Template toggle bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-slate-100 shrink-0">
                <button onClick={() => cycleTemplate(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"><FiChevronLeft size={14} /></button>
                <div className="flex-1 flex gap-1 overflow-x-auto scrollbar-hide">
                  {TEMPLATE_IDS.map(id => (
                    <button key={id} onClick={() => updateDesign({ template: id })}
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
                        activeTemplate === id ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                      }`}>
                      {TEMPLATE_NAMES[id]}
                    </button>
                  ))}
                </div>
                <button onClick={() => cycleTemplate(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"><FiChevronRight size={14} /></button>
              </div>

              {/* Resume preview — dynamically scaled */}
              <div ref={previewContainerRef} className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="flex justify-center">
                  <div
                    style={{
                      transform: `scale(${previewScale})`,
                      transformOrigin: 'top center',
                      width: '794px',
                      flexShrink: 0,
                      // Compensate for the scale so the container scrolls correctly
                      height: `calc(1123px * ${previewScale})`,
                      overflow: 'visible',
                    }}
                  >
                    <Preview />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
        active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}>
      <span className="text-base shrink-0">{icon}</span>
      {label}
    </button>
  );
}
