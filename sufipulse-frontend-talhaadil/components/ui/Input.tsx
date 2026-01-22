import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, showPasswordToggle, onTogglePassword, showPassword, className = '', ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 border border-slate-200 rounded-xl
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              outline-none transition-all duration-200
              bg-white/80 backdrop-blur-sm
              hover:border-slate-300
              ${icon ? 'pl-10' : ''}
              ${showPasswordToggle ? 'pr-12' : ''}
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            type={showPasswordToggle && showPassword ? 'text' : props.type}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;