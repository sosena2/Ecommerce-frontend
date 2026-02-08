import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const loader = (
    <div className="flex justify-center items-center">
      <Loader2 className={`animate-spin text-primary-600 ${sizeClasses[size]}`} />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {loader}
      </div>
    );
  }

  return loader;
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="xl" />
  </div>
);

export const Spinner = ({ className = '' }) => (
  <Loader2 className={`animate-spin ${className}`} />
);

export default Loader;