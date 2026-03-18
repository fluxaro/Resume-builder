import { useState } from 'react';
import { useResume } from '../../../hooks/useResume';
import { Button } from '../../ui/Inputs';
import { aiService } from '../../../services/aiService';
import { FiZap, FiCheckCircle, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Step10Optimize() {
  const { data, scoreData, setScoreData, updateSummary } = useResume();
  const [isScoring, setIsScoring] = useState(false);

  const handleOptimization = async () => {
    setIsScoring(true);
    try {
      const result = await aiService.optimizeResume(data);
      setScoreData(result);
    } catch {
      alert('AI scoring failed. Please check your API key.');
    } finally {
      setIsScoring(false);
    }
  };

  const acceptSummary = () => {
    if (scoreData?.optimizedSummary) {
      updateSummary(scoreData.optimizedSummary);
      alert('Summary updated successfully!');
    }
  };

  const scoreColor = scoreData
    ? scoreData.score >= 80 ? '#16a34a' : scoreData.score >= 60 ? '#d97706' : '#dc2626'
    : '#e2e8f0';

  return (
    <div className="flex flex-col gap-7">
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
          <FiStar />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">AI Resume Analysis</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Let AI score your resume against ATS standards and provide specific feedback to improve it.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleOptimization}
          isLoading={isScoring}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-md shadow-blue-100"
        >
          <FiZap /> {scoreData ? 'Re-Analyze Resume' : 'Analyze My Resume'}
        </Button>
      </div>

      {scoreData && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Resume Score</h4>
            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="42" stroke={scoreColor} strokeWidth="10" fill="none"
                  strokeDasharray="264" strokeDashoffset={264 - (264 * scoreData.score) / 100}
                  strokeLinecap="round" />
              </svg>
              <span className="text-4xl font-black text-slate-900">{scoreData.score}</span>
            </div>
            <p className="text-sm font-semibold" style={{ color: scoreColor }}>
              {scoreData.score >= 80 ? 'Excellent — High ATS match' : scoreData.score >= 60 ? 'Good — Needs some improvement' : 'Needs significant work'}
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Feedback</h4>
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm leading-relaxed">
              {scoreData.feedback}
            </div>

            {scoreData.optimizedSummary && scoreData.optimizedSummary !== data.summary && (
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <FiZap className="text-blue-500" /> Optimized Summary Suggestion
                </h5>
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg italic leading-relaxed mb-3">
                  "{scoreData.optimizedSummary}"
                </p>
                <Button size="sm" onClick={acceptSummary} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                  <FiCheckCircle /> Accept New Summary
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
