
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { analyzeDocument, generateAdminSummary } from './services/geminiService';
import type { FormData, UploadedFile, AISummary, DocumentAnalysisResult } from './types';
import { DOCUMENT_TYPES, INITIAL_FORM_DATA } from './constants';
import Step1Personal from './components/steps/Step1Personal';
import Step2Education from './components/steps/Step2Education';
import Step3Guardian from './components/steps/Step3Guardian';
import Step4Uploads from './components/steps/Step4Uploads';
import Step5Admin from './components/steps/Step5Admin';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 5;

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((id: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFiles(prev => ({
          ...prev,
          [id]: {
            file,
            preview: URL.createObjectURL(file),
            base64: (reader.result as string).split(',')[1],
            mimeType: file.type,
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[id];
        return newFiles;
      });
    }
  }, []);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const resetForm = () => {
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setUploadedFiles({});
    setAiSummary(null);
    setIsLoading(false);
    setError(null);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const analysisPromises = DOCUMENT_TYPES.map(doc => {
        const file = uploadedFiles[doc.id];
        if (file) {
          return analyzeDocument(file.base64, doc.name, file.mimeType);
        }
        return Promise.resolve({ documentType: doc.name, error: "File not uploaded." });
      });

      const analysisResults = await Promise.all(analysisPromises);
      
      const summary = await generateAdminSummary(formData, analysisResults as DocumentAnalysisResult[]);
      
      setAiSummary(summary);
      nextStep();
    } catch (err) {
      console.error("Error during AI processing:", err);
      setError("An error occurred during AI analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Personal formData={formData} handleChange={handleInputChange} />;
      case 2:
        return <Step2Education formData={formData} handleChange={handleInputChange} />;
      case 3:
        return <Step3Guardian formData={formData} handleChange={handleInputChange} />;
      case 4:
        return <Step4Uploads uploadedFiles={uploadedFiles} handleFileChange={handleFileChange} isLoading={isLoading} />;
      case 5:
        return <Step5Admin summary={aiSummary} isLoading={isLoading} error={error} onReset={resetForm} />;
      default:
        return <div>Form Complete</div>;
    }
  };
  
  const isNextDisabled = () => {
    if (currentStep === 4) {
      return DOCUMENT_TYPES.some(doc => !uploadedFiles[doc.id]) || isLoading;
    }
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-100">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Scholarship Application</h1>
          <p className="text-center text-slate-500 mb-8">AI-Powered Document Verification</p>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <div className="mt-10">
            {renderStep()}
          </div>
          <div className="mt-10 flex justify-between">
            {currentStep > 1 && currentStep < 5 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition duration-200"
              >
                Back
              </button>
            )}
             {currentStep === 5 && (
                 <div></div> // Placeholder to keep "Next" button on the right
             )}
            {currentStep < 4 && (
              <button
                onClick={nextStep}
                disabled={isNextDisabled()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
            {currentStep === 4 && (
              <button
                onClick={handleSubmit}
                disabled={isNextDisabled()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : 'Submit for AI Verification'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
