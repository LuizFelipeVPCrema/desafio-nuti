import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled}) => {
  return (
    <div className='flex flex-row-reverse pb-5'>
      <button disabled={disabled} onClick={onClick} className="bg-zinc-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-400">
          {children}
      </button>
    </div>
  );
};

export default Button;
