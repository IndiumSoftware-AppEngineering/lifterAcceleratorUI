import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) => (
  <div className='space-y-2'>
    <Label htmlFor={name} className='text-sm font-medium text-gray-700'>
      {label}
    </Label>
    <Input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='h-10 rounded-sm'
    />
    {error && <p className='text-sm text-red-600'>{error}</p>}
  </div>
);
