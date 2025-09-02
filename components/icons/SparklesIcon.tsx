
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    <path d="M4.5 4.5L6 9L10.5 10.5L6 12L4.5 16.5L3 12L-1.5 10.5L3 9L4.5 4.5Z" />
    <path d="M19.5 15L18 19.5L13.5 18L18 16.5L19.5 12L21 16.5L25.5 18L21 19.5L19.5 24Z" />
  </svg>
);
