
import React from 'react';
import { DOCUMENT_TYPES } from '../../constants';
import type { UploadedFile } from '../../types';
import { UploadIcon, CheckCircleIcon } from '../Icons';

interface Step4Props {
  uploadedFiles: Record<string, UploadedFile>;
  handleFileChange: (id: string, file: File | null) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<{
  doc: { id: string; name: string };
  file: UploadedFile | undefined;
  onFileChange: (id: string, file: File | null) => void;
  disabled: boolean;
}> = ({ doc, file, onFileChange, disabled }) => {
  const inputId = `file-upload-${doc.id}`;

  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 relative bg-slate-50 hover:border-blue-500">
      <input
        type="file"
        id={inputId}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => onFileChange(doc.id, e.target.files ? e.target.files[0] : null)}
        disabled={disabled}
      />
      {file?.preview ? (
        <div>
          <img src={file.preview} alt="Preview" className="max-h-40 mx-auto rounded-lg mb-4" />
          <p className="text-sm font-semibold text-gray-700 truncate">{file.file.name}</p>
          <div className="flex items-center justify-center text-green-600 mt-2">
            <CheckCircleIcon className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Uploaded</span>
          </div>
          <button
            onClick={() => onFileChange(doc.id, null)}
            disabled={disabled}
            className="mt-2 text-xs text-red-500 hover:text-red-700 disabled:text-gray-400"
          >
            Remove
          </button>
        </div>
      ) : (
        <label htmlFor={inputId} className={`cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}>
          <div className="flex flex-col items-center text-slate-500">
            <UploadIcon className="w-12 h-12 mb-2" />
            <h3 className="text-base font-semibold text-slate-700">{doc.name}</h3>
            <p className="text-xs">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </label>
      )}
    </div>
  );
};

const Step4Uploads: React.FC<Step4Props> = ({ uploadedFiles, handleFileChange, isLoading }) => {
  const allFilesUploaded = DOCUMENT_TYPES.every(doc => uploadedFiles[doc.id]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Upload Documents</h2>
      <p className="text-sm text-slate-500 mb-6">Please upload clear images of the required documents.</p>
       {allFilesUploaded && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg flex items-center">
             <CheckCircleIcon className="w-5 h-5 mr-2"/>
            <span className="font-medium">All documents have been uploaded. You can now proceed to AI verification.</span>
          </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOCUMENT_TYPES.map((doc) => (
          <FileUpload
            key={doc.id}
            doc={doc}
            file={uploadedFiles[doc.id]}
            onFileChange={handleFileChange}
            disabled={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Step4Uploads;
