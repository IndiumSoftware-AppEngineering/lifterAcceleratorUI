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
} from '../../_constants/type';
import { createProject } from './_api/projectCreationApi';

export function CreateProjectDrawerContent({
  onCancel,
  handleAddArtifacts,
}: CreateProjectDrawerContentProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    description: '',
    status: 'Active',
  });

  const [formErrors, setFormErrors] = React.useState<Partial<FormData>>({});
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [projectId, setProjectId] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch the project ID when the drawer is opened
  React.useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const response = await fetch('/api/projectCount');
        if (!response.ok) {
          throw new Error('Failed to fetch project count');
        }
        const data = await response.json();
        if (data.success) {
          setProjectId(data.nextProjectId); // Set the next project ID
        } else {
          setError(data.error || 'Failed to fetch project count');
        }
      } catch {
        setError('An error occurred while fetching the project count.');
      }
    };

    fetchProjectCount();
  }, []);

  const resetState = () => {
    setFormData({
      name: '',
      description: '',
      status: 'Active', // Reset status to default
    });
    setFormErrors({});
    setShowSuccessModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate the form
    if (validateForm(formData, setFormErrors)) {
      try {
        // Call the createProject function
        const result = await createProject({
          ...formData,
        });

        if (result.success) {
          // Show success modal
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

  // Fetch the next project ID when the drawer is closed
  const handleCancel = async () => {
    try {
      const response = await fetch('/api/projectCount');
      if (!response.ok) {
        throw new Error('Failed to fetch project count');
      }
      const data = await response.json();
      if (data.success) {
        setProjectId(data.nextProjectId); // Update the project ID
      } else {
        setError(data.error || 'Failed to fetch updated project count');
      }
    } catch {
      setError('An error occurred while fetching the project count.');
    } finally {
      onCancel(); // Close the drawer
    }
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
              value={projectId || 'Loading...'} // Display the fetched project ID
              onChange={() => {}} // Disable input
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
                onClick={handleCancel} // Use handleCancel instead of onCancel
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
            handleModalClose(); // Close the modal
            handleAddArtifacts(); // Switch to "Add Artifacts" content
          }}
          successIcon={SuccessIcon}
        />
      )}
    </div>
  );
}