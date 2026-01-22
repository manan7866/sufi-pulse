import React from 'react';
import { motion } from 'framer-motion';

interface FormCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, title, subtitle, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        relative max-w-md w-full mx-auto
        bg-white/90 backdrop-blur-xl
        border border-white/20
        rounded-2xl shadow-2xl
        p-8
        ${className}
      `}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-slate-600">{subtitle}</p>
          )}
        </motion.div>
        
        {children}
      </div>
    </motion.div>
  );
};

export default FormCard;