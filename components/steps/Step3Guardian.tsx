
import React from 'react';
import type { FormData } from '../../types';
import FormInput from '../FormInput';

interface Step3Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step3Guardian: React.FC<Step3Props> = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Guardian Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Mother's Maiden Name" name="motherMaidenName" value={formData.motherMaidenName} onChange={handleChange} />
        <FormInput label="Mother's Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormInput label="Father's Full Name" name="fatherFullName" value={formData.fatherFullName} onChange={handleChange} />
        <FormInput label="Father's Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Step3Guardian;
