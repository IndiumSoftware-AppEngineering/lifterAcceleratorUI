import * as React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import closeDrawerIcon from '../../../../../public/assets/Slide back.svg';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { validateForm } from './validation';
import { StatusDropdown } from './statusdropdown';
import { FormField } from './formField';
import { SuccessModal } from './artifactModal';
import SuccessIcon from '../../../../../public/assets/Group 18081.svg';

interface CreateProjectDrawerContentProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  id: string;
  description: string;
  status: string;
}

export function CreateProjectDrawerContent({
  onSubmit,
  onCancel,
}: CreateProjectDrawerContentProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    id: '',
    description: '',
    status: 'Active',
  });

  const [formErrors, setFormErrors] = React.useState<Partial<FormData>>({});
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const resetState = () => {
    setFormData({
      name: '',
      id: '',
      description: '',
      status: 'Active',
    });
    setFormErrors({});
    setShowSuccessModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm(formData, setFormErrors)) {
      onSubmit(formData);
      setShowSuccessModal(true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    resetState();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='border-b p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-semibold'>Create New Project</h2>
          </div>

          <Image
            src={closeDrawerIcon}
            alt={''}
            onClick={onCancel}
            className='cursor-pointer'
          />
        </div>
      </div>
      <div className='flex items-center justify-between rounded-sm bg-[#F7F7F7] p-2'>
        <StatusDropdown
          status={formData.status}
          setFormData={setFormData} // Pass setFormData directly
        />
        <Button variant='ghost' size='icon' className='h-8 w-8 rounded-sm'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        <div className='space-y-2'>
          {/* Status Bar */}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              label='Project Name*'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              placeholder='Project Title'
            />
            <FormField
              label='Project ID*'
              name='id'
              value={formData.id}
              onChange={handleInputChange}
              error={formErrors.id}
              placeholder='Project Id'
            />
            <div className='space-y-2'>
              <Label
                htmlFor='description'
                className='text-sm font-medium text-gray-700'
              >
                Description
              </Label>
              <Textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Write Here...'
                className='min-h-[120px] resize-none rounded-sm'
              />
            </div>
            <div className='flex justify-center gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                className='h-10 px-6 text-[#172B9E] rounded-sm'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='h-10 px-6 bg-[#172B9E] hover:bg-blue-700 rounded-sm'
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          onConfirm={handleModalClose}
          successIcon={SuccessIcon}
        />
      )}
    </div>
  );
}
