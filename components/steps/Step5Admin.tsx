
import React from 'react';
import type { AISummary, Discrepancy } from '../../types';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '../Icons';

interface Step5Props {
  summary: AISummary | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
}

const StatusBadge: React.FC<{ status: 'Verified' | 'Discrepancies Found' | 'Error' | 'Not Verified' | 'Not Uploaded' }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full inline-flex items-center";
  if (status === 'Verified') {
    return <span className={`${baseClasses} bg-green-100 text-green-800`}><CheckCircleIcon className="w-4 h-4 mr-1"/>{status}</span>;
  }
  if (status === 'Discrepancies Found' || status === 'Not Verified') {
    return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}><ExclamationTriangleIcon className="w-4 h-4 mr-1"/>{status}</span>;
  }
   if (status === 'Error' || status === 'Not Uploaded') {
    return <span className={`${baseClasses} bg-red-100 text-red-800`}><XCircleIcon className="w-4 h-4 mr-1"/>{status}</span>;
  }
  return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
};


const Step5Admin: React.FC<Step5Props> = ({ summary, isLoading, error, onReset }) => {

  const handleApprove = () => {
    alert("Application Approved!");
    onReset();
  }

  const handleReject = () => {
    alert("Application Rejected!");
    onReset();
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">AI Verification in Progress...</h2>
        <p className="text-gray-500 mt-2">Our AI is analyzing the documents and cross-checking the information. This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <XCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-800">Analysis Failed</h2>
        <p className="text-red-600 mt-2">{error}</p>
         <button onClick={onReset} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-200">
            Start Over
        </button>
      </div>
    );
  }

  if (!summary) {
    return <div className="text-center text-gray-500">No summary available.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">AI Verification Summary</h2>
      <div className="text-center mb-8">
        <StatusBadge status={summary.verificationStatus} />
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Applicant Profile Summary</h3>
          <p className="text-gray-600 bg-slate-50 p-4 rounded-lg">{summary.applicantSummary}</p>
        </div>

        {summary.discrepancies.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-yellow-700 mb-3 border-b pb-2 flex items-center"><ExclamationTriangleIcon className="w-5 h-5 mr-2"/>Discrepancies Found</h3>
            <div className="space-y-3">
              {summary.discrepancies.map((d, i) => (
                <div key={i} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-800">Mismatch in: <span className="font-bold">{d.field}</span></p>
                  <div className="text-sm mt-2 grid grid-cols-2 gap-4">
                    <div><span className="font-medium text-gray-500">Form Value:</span> <span className="text-gray-800">{d.userValue}</span></div>
                    <div><span className="font-medium text-gray-500">Document Value:</span> <span className="text-gray-800">{d.documentValue}</span> (<em className="text-xs">{d.documentType}</em>)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2 flex items-center"><InformationCircleIcon className="w-5 h-5 mr-2"/>Document Checks</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Document</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">AI Notes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {summary.documentChecks.map((doc, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-3 px-4 font-medium">{doc.documentType}</td>
                      <td className="py-3 px-4"><StatusBadge status={doc.status as any} /></td>
                      <td className="py-3 px-4 text-sm text-gray-600">{doc.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
      
      <div className="mt-12 pt-6 border-t flex justify-center gap-4">
        <button onClick={handleApprove} className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition duration-200 flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6"/> Approve
        </button>
        <button onClick={handleReject} className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition duration-200 flex items-center gap-2">
            <XCircleIcon className="w-6 h-6"/> Reject
        </button>
      </div>

    </div>
  );
};

export default Step5Admin;
