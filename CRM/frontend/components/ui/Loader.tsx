
import React from 'react';

export const Loader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className="flex justify-center items-center py-10">
      <div className={`${sizeClasses[size]} border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin`}></div>
    </div>
  );
};
