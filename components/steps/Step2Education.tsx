
import React from 'react';
import type { FormData } from '../../types';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import { HONORS, STRANDS, YEAR_LEVELS } from '../../constants';

interface Step2Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step2Education: React.FC<Step2Props> = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Educational Background</h2>
      
      <div className="p-4 border rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Junior High School</h3>
        <FormInput label="Junior High School Name" name="jhsName" value={formData.jhsName} onChange={handleChange} />
        <FormInput label="Junior High School Address" name="jhsAddress" value={formData.jhsAddress} onChange={handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormInput label="Year Started" name="jhsYearStarted" value={formData.jhsYearStarted} onChange={handleChange} placeholder="YYYY" />
            <FormInput label="Year Graduated" name="jhsYearGraduated" value={formData.jhsYearGraduated} onChange={handleChange} placeholder="YYYY" />
        </div>
        <div className="mt-6">
            <FormSelect label="With Honors" name="jhsWithHonors" value={formData.jhsWithHonors} onChange={handleChange} options={HONORS} />
        </div>
      </div>

       <div className="p-4 border rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Senior High School</h3>
        <FormInput label="Senior High School Name" name="shsName" value={formData.shsName} onChange={handleChange} />
        <FormInput label="Senior High School Address" name="shsAddress" value={formData.shsAddress} onChange={handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormInput label="Year Started" name="shsYearStarted" value={formData.shsYearStarted} onChange={handleChange} placeholder="YYYY" />
            <FormInput label="Year Graduated" name="shsYearGraduated" value={formData.shsYearGraduated} onChange={handleChange} placeholder="YYYY" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormSelect label="Strand" name="shsStrand" value={formData.shsStrand} onChange={handleChange} options={STRANDS} />
            <FormSelect label="With Honors" name="shsWithHonors" value={formData.shsWithHonors} onChange={handleChange} options={HONORS} />
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">College / University</h3>
        <FormInput label="College or University Name" name="collegeName" value={formData.collegeName} onChange={handleChange} />
        <FormInput label="College or University Address" name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <FormInput label="Year Started" name="collegeYearStarted" value={formData.collegeYearStarted} onChange={handleChange} placeholder="YYYY" />
            <FormInput label="Expected Year of Graduation" name="collegeExpectedGraduation" value={formData.collegeExpectedGraduation} onChange={handleChange} placeholder="YYYY" />
            <FormInput label="Cumulative GPA" name="collegeGpa" value={formData.collegeGpa} onChange={handleChange} type="number" placeholder="0.00" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormSelect label="Year Level" name="collegeYearLevel" value={formData.collegeYearLevel} onChange={handleChange} options={YEAR_LEVELS} />
            <FormInput label="Course" name="collegeCourse" value={formData.collegeCourse} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Step2Education;
