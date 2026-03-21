import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import Step1Personal from './steps/Step1Personal';
import Step2Summary from './steps/Step2Summary';
import Step3Experience from './steps/Step3Experience';
import Step4Education from './steps/Step4Education';
import Step5Skills from './steps/Step5Skills';
import Step6Projects from './steps/Step6Projects';
import Step7Certifications from './steps/Step7Certifications';
import Step8Additional from './steps/Step8Additional';
import Step9Design from './steps/Step9Design';
import Step10Optimize from './steps/Step10Optimize';
import { Button } from '../ui/Inputs';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Summary & Level' },
  { id: 3, title: 'Experience' },
  { id: 4, title: 'Education' },
  { id: 5, title: 'Skills' },
  { id: 6, title: 'Projects' },
  { id: 7, title: 'Certifications' },
  { id: 8, title: 'Additional' },
  { id: 9, title: 'Design' },
  { id: 10, title: 'Review' },
];

export default function Editor() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Personal />;
      case 2: return <Step2Summary />;
      case 3: return <Step3Experience />;
      case 4: return <Step4Education />;
      case 5: return <Step5Skills />;
      case 6: return <Step6Projects />;
      case 7: return <Step7Certifications />;
      case 8: return <Step8Additional />;
      case 9: return <Step9Design />;
      case 10: return <Step10Optimize />;
      default: return <Step1Personal />;
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-white">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 z-10">
        <div
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step tabs */}
      <div className="flex gap-1 px-4 pt-5 pb-2 overflow-x-auto scrollbar-hide border-b border-slate-100">
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentStep === s.id
                ? 'bg-slate-900 text-white'
                : s.id < currentStep
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {s.id < currentStep ? <FiCheck className="inline mr-1" /> : null}
            {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-7 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Step {currentStep} of {STEPS.length}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              {STEPS[currentStep - 1].title}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <FiChevronLeft /> Back
        </Button>
        {currentStep < STEPS.length ? (
          <Button variant="primary" onClick={nextStep}>
            Next <FiChevronRight />
          </Button>
        ) : (
          <Button variant="primary">
            Finish <FiCheck />
          </Button>
        )}
      </div>
    </div>
  );
}
