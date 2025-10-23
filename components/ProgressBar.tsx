
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
    "Personal Info",
    "Education",
    "Guardian",
    "Uploads",
    "Verification"
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepIndex = index + 1;
          const isCompleted = currentStep > stepIndex;
          const isActive = currentStep === stepIndex;
          
          return (
            <React.Fragment key={stepIndex}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${isCompleted ? 'bg-blue-600' : isActive ? 'bg-blue-500 scale-110' : 'bg-slate-300'}`}>
                    {isCompleted ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : stepIndex}
                </div>
                <p className={`mt-2 text-xs text-center font-semibold ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>{label}</p>
              </div>
              {stepIndex < totalSteps && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${currentStep > stepIndex ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
