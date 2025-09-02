
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-brand-primary" />
          <h1 className="text-2xl font-bold text-brand-secondary">AI Professional Portraits</h1>
        </div>
      </div>
    </header>
  );
};
