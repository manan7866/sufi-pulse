import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
  const requirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'Contains special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const passedRequirements = requirements.filter(req => req.test(password));
  const strength = passedRequirements.length;
  
  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-3 ${className}`}
    >
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">Password Strength</span>
          <span className={`text-sm font-medium ${
            strength <= 2 ? 'text-red-600' : 
            strength <= 3 ? 'text-yellow-600' : 
            strength <= 4 ? 'text-blue-600' : 'text-green-600'
          }`}>
            {getStrengthLabel()}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(strength / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
            className={`h-2 rounded-full transition-colors duration-300 ${getStrengthColor()}`}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const passed = requirement.test(password);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 text-xs"
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                passed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              </div>
              <span className={passed ? 'text-green-600' : 'text-slate-500'}>
                {requirement.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PasswordStrength;