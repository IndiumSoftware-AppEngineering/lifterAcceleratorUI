import * as React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { validateForm } from './validation';
import { StatusDropdown } from './statusdropdown';
import { FormField } from './formField';
import { SuccessModal } from './artifactModal';
import SuccessIcon from '../../../../../public/assets/Group 18081.svg';
import {
  CreateProjectDrawerContentProps,
  FormData,
  FormErrors,
} from '../../_constants/type';
import { createProject } from './_api/projectCreationApi';
import { revalidateDashboard } from '../../revalidateDashboard';

export function CreateProjectDrawerContent({
  onCancel,
  handleAddArtifacts,
}: CreateProjectDrawerContentProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    description: '',
    status: true,
  });

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const resetState = () => {
    setFormData({
      name: '',
      description: '',
      status: true,
    });
    setFormErrors({});
    setShowSuccessModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm(formData, setFormErrors)) {
      console.log('Form data:', formData);
      try {
        // Step 1: Create the project
        const result = await createProject({
          ...formData,
        });

        if (result.success) {
          // Step 2: Revalidate the dashboard
          await revalidateDashboard();

          // Step 3: Show the success modal
          setShowSuccessModal(true);
        } else {
          setError(result.error || 'Failed to create project');
        }
      } catch {
        setError('An unexpected error occurred while creating the project.');
      }
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

  const handleCancel = async () => {
    onCancel();
  };

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='border-b p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-semibold'>Create New Project</h2>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between rounded-sm bg-[#F7F7F7] p-2'>
        <StatusDropdown status={formData.status} setFormData={setFormData} />
        <Button variant='ghost' size='icon' className='h-8 w-8 rounded-sm'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        <div className='space-y-2'>
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
                onClick={handleCancel}
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

      {/* Error Message */}
      {error && (
        <div className='p-4 text-red-500'>
          <p>{error}</p>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          onConfirm={() => {
            handleModalClose();
            handleAddArtifacts();
          }}
          successIcon={SuccessIcon}
        />
      )}
    </div>
  );
}