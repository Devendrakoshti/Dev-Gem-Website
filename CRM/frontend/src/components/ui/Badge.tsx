
import React from 'react';

type BadgeColor = 'gray' | 'red' | 'green' | 'blue' | 'yellow' | 'indigo' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'gray' }) => {
  const colors: Record<BadgeColor, string> = {
    gray: 'bg-slate-100 text-slate-700',
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};
