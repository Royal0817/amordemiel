import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import gallerySeed from '../data/gallerySeed';

const STORAGE_KEY = 'adm_gallery_items';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [galleryItems, setGalleryItems] = useState(() => {
    if (typeof window === 'undefined') return gallerySeed;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to load gallery items', error);
    }
    return gallerySeed;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(galleryItems));
    } catch (error) {
      console.error('Failed to persist gallery items', error);
    }
  }, [galleryItems]);

  const addGalleryItem = useCallback((item) => {
    const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setGalleryItems((prev) => [{ id, ...item }, ...prev]);
  }, []);

  const removeGalleryItem = useCallback((id) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({ galleryItems, addGalleryItem, removeGalleryItem }),
    [galleryItems, addGalleryItem, removeGalleryItem]
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
