import GitHubIcon from '@mui/icons-material/GitHub';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DropdownOption } from './type';

export const ARTIFACT_OPTIONS = [
  { id: 'github', Icon: GitHubIcon, label: 'GitHub' },
  { id: 'file_upload', Icon: DriveFolderUploadIcon, label: 'FileUpload' },
  { id: 'ellipsis', Icon: MoreHorizIcon, label: 'More Options' },
];

export const URL_PATTERN = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 6;
export const DROPDOWN_OPTIONS: DropdownOption[] = [
  {
    id: 'git_https',
    label: 'Git Public Repo - Https',
    fields: ['Git URL', 'Branch'],
  },
  {
    id: 'git_https_pat',
    label: 'Git with Https and PAT',
    fields: ['Git URL', 'PAT', 'Branch'],
  },
  {
    id: 'git_ssh_pat',
    label: 'Git with SSH and PAT',
    fields: ['SSH URL', 'PAT'],
  },  
  // {
  //   id: "git_ssh_key",
  //   label: "Git with SSH and Public Key",
  //   fields: ["SSH URL", "Branch", "Public Key"],
  // },
  // {
  //   id: "git_zip",
  //   label: "Git Repo as Zip",
  //   fields: ["Upload Zip"],
  // },
];
