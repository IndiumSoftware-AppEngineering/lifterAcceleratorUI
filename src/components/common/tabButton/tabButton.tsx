import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-1 py-4 font-bold ${
        isActive ? 'border-b-2 border-[#172B9E] text-[#172B9E]' : 'text-[#8C8D90]'
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
