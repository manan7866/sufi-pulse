import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-200 transform
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-emerald-600 to-emerald-700
      hover:from-emerald-700 hover:to-emerald-800
      text-white shadow-lg hover:shadow-xl
      focus:ring-emerald-500
      hover:scale-105 active:scale-95
    `,
    secondary: `
      bg-slate-100 hover:bg-slate-200
      text-slate-700 hover:text-slate-800
      focus:ring-slate-500
      hover:scale-105 active:scale-95
    `,
    outline: `
      border-2 border-slate-300 hover:border-emerald-500
      text-slate-700 hover:text-emerald-600
      bg-white/80 backdrop-blur-sm
      focus:ring-emerald-500
      hover:scale-105 active:scale-95
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;