
import React from 'react';

interface PortraitCanvasProps {
  originalImage: string | null;
  generatedImage: string | null;
}

const ImagePlaceholder: React.FC = () => (
  <div className="w-full aspect-square bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
    <div className="text-center text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="mt-2 text-sm font-semibold">Your portrait will appear here</p>
    </div>
  </div>
);


export const PortraitCanvas: React.FC<PortraitCanvasProps> = ({ originalImage, generatedImage }) => {
  if (!originalImage) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-3-5.197m-3 0A5.995 5.995 0 006 12.75a5.995 5.995 0 003-5.197" />
          </svg>
        <h3 className="mt-4 text-xl font-bold text-brand-secondary">Ready to create your professional portrait?</h3>
        <p className="mt-1">Start by uploading a photo and selecting your desired style.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div>
        <h3 className="text-lg font-bold text-center mb-3 text-brand-secondary">Original</h3>
        <img src={originalImage} alt="Original" className="w-full aspect-square object-cover rounded-lg shadow-md" />
      </div>
      <div className="relative">
        <h3 className="text-lg font-bold text-center mb-3 text-brand-secondary">Generated Portrait</h3>
        {generatedImage ? (
          <>
            <img src={generatedImage} alt="Generated" className="w-full aspect-square object-cover rounded-lg shadow-md" />
            <a
              href={generatedImage}
              download="professional-portrait.png"
              className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm text-brand-secondary font-bold py-2 px-3 rounded-lg hover:bg-white transition-colors duration-200 shadow"
            >
              Download
            </a>
          </>
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </div>
  );
};
