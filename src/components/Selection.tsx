import React, { useEffect, useRef, useState } from "react";
export interface SelectItem {
  value: string;
  label: string;
}
interface SelectOptionProps {
  value: SelectItem;
  active?: boolean;
  onChangeValue: (value: SelectItem) => void;
}

export interface SelectProps {
  value: SelectItem;
  options: SelectItem[];
  className?: string;
  onChange: (item: SelectItem) => void;
}

interface SelectState {
  value: SelectItem;
  showOptions: boolean;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  active = false,
  onChangeValue,
}) => {
  const handleChange = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    onChangeValue(value);
  };

  return (
    <li
      className={`text-gray-900 cursor-default hover:bg-secondary  select-none relative py-2 pl-3 pr-9 ${
        active ? "bg-primary text-white hover:text-gray-900" : ""
      }`}
      onClick={handleChange}
    >
      <div className="flex items-center">
        <span className="ml-3 block font-normal truncate ">{value.label}</span>
      </div>
    </li>
  );
};

export const Selection: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const [state, setState] = useState<SelectState>({
    value,
    showOptions: false,
  });

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      showOptions: !state.showOptions,
    }));
  };

  const onChangeValue = (ele: SelectItem) => {
    setState((prevState) => ({ ...prevState, showOptions: false, value: ele }));
    onChange(ele);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setState((prevState) => ({
        ...prevState,
        showOptions: false,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`mt-1 relative ${
        !state.showOptions ? "hover:bg-secondary hover:ring-primary" : ""
      } ${className}`}
    >
      <button
        type="button"
        className="relative w-full pl-3 pr-10 text-left cursor-default outline-none sm:text-sm focus:ring-primary"
        onClick={handleClick}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">{state.value.label}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={
              state.showOptions
                ? "h-5 w-5 text-gray-800"
                : "h-5 w-5 text-gray-400"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
      {state.showOptions && (
        <div className="absolute mt-1 w-full z-1 bg-white shadow-xl z-10 ">
          <ul className="max-h-56 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option, idx) => (
              <SelectOption
                key={idx}
                value={option}
                active={state.value.value === option.value}
                onChangeValue={(option: SelectItem) => onChangeValue(option)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Selection;
