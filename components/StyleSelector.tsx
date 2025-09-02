
import React from 'react';
import type { StyleOption } from '../types';

interface StyleSelectorProps<T extends StyleOption> {
  title: string;
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
}

export const StyleSelector = <T extends StyleOption,>({ title, options, selected, onSelect }: StyleSelectorProps<T>) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
              selected.id === option.id
                ? 'border-brand-primary bg-blue-50 ring-2 ring-brand-primary'
                : 'border-gray-200 bg-white hover:border-gray-400'
            }`}
          >
            <p className="font-bold text-sm text-brand-secondary">{option.label}</p>
            <p className="text-xs text-gray-500 mt-1">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
