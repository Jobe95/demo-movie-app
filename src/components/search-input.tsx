import { useEffect, useRef } from "react";

export interface SearchInputProps {
  value: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
}

interface ClearIconProps {
  onClick: () => void;
}

export const SearchInput = ({
  value,
  autoFocus,
  onChange,
  onClear,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, []);
  return (
    <div className="relative max-w-60">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a show..."
        aria-label="Search shows"
        className="w-full rounded-full px-4 py-2 pr-8 text-black focus:shadow-md focus:shadow-emerald-500 focus:outline-emerald-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && <ClearIcon onClick={() => onClear()} />}
    </div>
  );
};

const ClearIcon = ({ onClick }: ClearIconProps) => (
  <button
    onClick={onClick}
    aria-label="Clear search"
    className="absolute inset-y-0 right-0 flex items-center pr-2"
  >
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer text-gray-400 hover:text-emerald-500"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
);
