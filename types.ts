
export interface FormData {
  // Personal Info
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  birthDate: string;
  address1: string;
  address2: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  region: string;
  yearsOfResidency: string;

  // Educational Background
  jhsName: string;
  jhsAddress: string;
  jhsYearStarted: string;
  jhsYearGraduated: string;
  jhsWithHonors: string;
  shsName: string;
  shsAddress: string;
  shsYearStarted: string;
  shsYearGraduated: string;
  shsStrand: string;
  shsWithHonors: string;
  collegeName: string;
  collegeAddress: string;
  collegeYearStarted: string;
  collegeExpectedGraduation: string;
  collegeGpa: string;
  collegeYearLevel: string;
  collegeCourse: string;

  // Guardian Info
  motherMaidenName: string;
  motherOccupation: string;
  fatherFullName: string;
  fatherOccupation: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
  base64: string;
  mimeType: string;
}

export interface DocumentAnalysisResult {
  documentType: string;
  isCorrectDocumentType?: boolean;
  extractedData?: Record<string, any>;
  error?: string;
  summary?: string;
}

export interface Discrepancy {
  field: string;
  userValue: string;
  documentValue: string;
  documentType: string;
}

export interface AISummary {
  applicantSummary: string;
  verificationStatus: 'Verified' | 'Discrepancies Found' | 'Error';
  discrepancies: Discrepancy[];
  documentChecks: {
    documentType: string;
    status: 'Verified' | 'Not Verified' | 'Not Uploaded' | 'Error';
    notes: string;
  }[];
}
