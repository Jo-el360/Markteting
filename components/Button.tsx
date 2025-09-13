
import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={`
        relative inline-flex items-center justify-center px-8 py-3 font-bold text-white
        rounded-lg overflow-hidden
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-cyan-500/50
        disabled:opacity-60 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        group
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 group-hover:from-cyan-600 group-hover:to-fuchsia-700 transition-all duration-300" />
      <span className="relative flex items-center justify-center">
        {loading && <Spinner size="sm" />}
        <span className={loading ? 'ml-2' : ''}>
          {children}
        </span>
      </span>
    </button>
  );
};
