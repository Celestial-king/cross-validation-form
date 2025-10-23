
import React from 'react';
import type { FormData } from '../../types';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import { GENDERS } from '../../constants';

interface Step1Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step1Personal: React.FC<Step1Props> = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
        <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
        <FormInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} required={false} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormInput label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" />
        <FormInput label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} type="tel" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormSelect label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={GENDERS} />
        <FormInput label="Birthdate" name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" />
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Address Line 1 (House/Unit/Building + Street)" name="address1" value={formData.address1} onChange={handleChange} />
        <FormInput label="Address Line 2 (Subdivision/Village/Purok/Sitio)" name="address2" value={formData.address2} onChange={handleChange} required={false} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <FormInput label="Barangay" name="barangay" value={formData.barangay} onChange={handleChange} />
        <FormInput label="City/Municipality" name="city" value={formData.city} onChange={handleChange} />
        <FormInput label="Province" name="province" value={formData.province} onChange={handleChange} />
        <FormInput label="ZIP Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
         <FormInput label="Region (auto-derived)" name="region" value={formData.region} onChange={handleChange} placeholder="e.g. NCR" />
        <FormInput label="Years of Residency" name="yearsOfResidency" value={formData.yearsOfResidency} onChange={handleChange} type="number" placeholder="Enter number of years"/>
      </div>
    </div>
  );
};

export default Step1Personal;
