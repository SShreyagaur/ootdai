
export type ClothingCategory = 'hairstyles' | 'tops' | 'bottoms' | 'dresses' | 'shoes' | 'accessories';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  image: string;
  gender: 'barbie' | 'ken';
  zIndex: number;
  description?: string;
  brand?: string;
  price?: number;
}

export interface AvatarState {
  hairstyle: ClothingItem | null;
  top: ClothingItem | null;
  bottom: ClothingItem | null;
  dress: ClothingItem | null;
  shoes: ClothingItem | null;
  accessories: ClothingItem[];
}

export interface DressUpSettings {
  enableDragDrop: boolean;
  enableAnimations: boolean;
  soundEffects: boolean;
  backgroundMusic: boolean;
}
