import React from 'react';

interface InputProps {
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <div className={"pb-5"}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className=" text-black border border-gray-300 bg-zinc-100 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-600"
      />
    </div>

  );
};

export default Input;
