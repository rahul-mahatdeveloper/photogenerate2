
import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "Analyzing your photo's structure...",
  "Applying professional attire...",
  "Rendering a new background...",
  "Adjusting DSLR-style lighting...",
  "Perfecting the color grade...",
  "Finalizing your portrait...",
];

export const Loader: React.FC = () => {
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
        return LOADING_MESSAGES[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-brand-secondary p-8">
      <svg className="animate-spin h-12 w-12 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h3 className="mt-6 text-xl font-bold">Generating Your Portrait...</h3>
      <p className="mt-2 text-gray-500 transition-opacity duration-500">{message}</p>
    </div>
  );
};
