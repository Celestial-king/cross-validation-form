
import type { FormData } from './types';

export const INITIAL_FORM_DATA: FormData = {
  lastName: '',
  firstName: '',
  middleName: '',
  email: '',
  mobileNumber: '',
  gender: '',
  birthDate: '',
  address1: '',
  address2: '',
  barangay: '',
  city: '',
  province: '',
  zipCode: '',
  region: '',
  yearsOfResidency: '',
  jhsName: '',
  jhsAddress: '',
  jhsYearStarted: '',
  jhsYearGraduated: '',
  jhsWithHonors: '',
  shsName: '',
  shsAddress: '',
  shsYearStarted: '',
  shsYearGraduated: '',
  shsStrand: '',
  shsWithHonors: '',
  collegeName: '',
  collegeAddress: '',
  collegeYearStarted: '',
  collegeExpectedGraduation: '',
  collegeGpa: '',
  collegeYearLevel: '',
  collegeCourse: '',
  motherMaidenName: '',
  motherOccupation: '',
  fatherFullName: '',
  fatherOccupation: '',
};

export const GENDERS = ['Male', 'Female', 'Prefer not to say'];
export const HONORS = ['With Honors', 'With High Honors', 'With Highest Honors', 'None'];
export const STRANDS = ['STEM', 'ABM', 'HUMSS', 'GAS', 'TVL'];
export const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

export const DOCUMENT_TYPES = [
  { id: 'psa', name: 'PSA Birth Certificate' },
  { id: 'studentVoter', name: "Student's Voter's Certification" },
  { id: 'guardianVoter', name: "Guardian's Voter's Certification" },
  { id: 'barangayId', name: 'Barangay ID' },
  { id: 'schoolId', name: 'Valid ID or School ID' },
  { id: 'cor', name: 'Certificate of Registration (COR)' },
  { id: 'cog', name: 'Certificate of Grades (COG)' },
];
