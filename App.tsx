
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { PortraitCanvas } from './components/PortraitCanvas';
import { Loader } from './components/Loader';
import type { ClothingStyle, BackgroundStyle } from './types';
import { CLOTHING_STYLES, BACKGROUND_STYLES } from './constants';
import { generateProfessionalPortrait } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<ClothingStyle>(CLOTHING_STYLES[0]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundStyle>(BACKGROUND_STYLES[0]);
  const [generatedPortrait, setGeneratedPortrait] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setGeneratedPortrait(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGeneration = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPortrait(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const result = await generateProfessionalPortrait(base64Image, originalImage.type, selectedClothing.label, selectedBackground.label);
      
      if (result.image) {
        setGeneratedPortrait(`data:image/png;base64,${result.image}`);
      } else {
        setError(result.text || 'Failed to generate portrait. The model did not return an image.');
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedClothing, selectedBackground]);

  return (
    <div className="min-h-screen bg-gray-50 text-brand-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-brand-secondary mb-4">1. Upload Your Photo</h2>
            <ImageUploader onImageUpload={handleImageUpload} />

            {originalImage && (
              <>
                <h2 className="text-xl font-bold text-brand-secondary mt-8 mb-4">2. Customize Your Portrait</h2>
                <StyleSelector
                  title="Clothing Style"
                  options={CLOTHING_STYLES}
                  selected={selectedClothing}
                  onSelect={setSelectedClothing}
                />
                <StyleSelector
                  title="Background"
                  options={BACKGROUND_STYLES}
                  selected={selectedBackground}
                  onSelect={setSelectedBackground}
                />
                <button
                  onClick={handleGeneration}
                  disabled={isLoading}
                  className="w-full mt-8 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Generating...' : 'Generate Portrait'}
                </button>
              </>
            )}
          </div>

          {/* Right Column: Display */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 min-h-[300px] lg:min-h-full">
              {isLoading && <Loader />}
              {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
              
              {!isLoading && !error && (
                <PortraitCanvas
                  originalImage={originalImagePreview}
                  generatedImage={generatedPortrait}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini. Create your professional identity.</p>
      </footer>
    </div>
  );
};

export default App;
