import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DropdownOption } from './type';

export const ARTIFACT_OPTIONS = [
  { id: "github", Icon: GitHubIcon, label: "GitHub" },
  { id: "globe", Icon: LanguageIcon, label: "Globe" },
  { id: "ellipsis", Icon: MoreHorizIcon, label: "More Options" },
];

export const URL_PATTERN = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

export const DROPDOWN_OPTIONS: DropdownOption[] = [
  {
    id: "git_https",
    label: "Git Public Repo - Https",
    fields: ["Git URL", "Branch"],
  },
  {
    id: "git_https_pat",
    label: "Git with Https and PAT",
    fields: ["Git URL", "PAT"],
  },
  {
    id: "git_ssh_pat",
    label: "Git with SSH and PAT",
    fields: ["Git URL", "PAT"],
  },
  {
    id: "git_ssh_key",
    label: "Git with SSH and Public Key",
    fields: ["Git URL", "Branch", "SSH", "Public Key"],
  },
  {
    id: "git_zip",
    label: "Git Repo as Zip",
    fields: ["Upload Zip"],
  },
];