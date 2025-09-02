
import type { ClothingStyle, BackgroundStyle } from './types';

export const CLOTHING_STYLES: ClothingStyle[] = [
  { id: 'suit', label: 'Business Suit', description: 'Classic and formal for corporate roles.' },
  { id: 'blouse', label: 'Blouse', description: 'Elegant and professional for any setting.' },
  { id: 'button-down', label: 'Button-down Shirt', description: 'A smart-casual, versatile choice.' },
  { id: 'sweater', label: 'Smart Casual Sweater', description: 'Approachable yet professional.' },
  { id: 'turtleneck', label: 'Turtleneck', description: 'Modern, stylish, and sophisticated.' },
];

export const BACKGROUND_STYLES: BackgroundStyle[] = [
  { id: 'office', label: 'Modern Office', description: 'A blurred, professional corporate environment.' },
  { id: 'neutral-wall', label: 'Neutral Wall', description: 'A clean, simple, and minimalist backdrop.' },
  { id: 'bookshelf', label: 'Bookshelf', description: 'An intellectual and sophisticated background.' },
  { id: 'outdoor-urban', label: 'Outdoor Urban', description: 'A dynamic and modern city scene.' },
  { id: 'studio-gray', label: 'Studio Gray', description: 'Classic photographer\'s studio backdrop.' },
];
