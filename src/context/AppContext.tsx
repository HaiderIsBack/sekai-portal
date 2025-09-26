"use client";

import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type AppContextType = {
    imageCounter: number;
    availableImages: string[];
    getImageSourceURL: (imageName?: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: {children: React.ReactNode}) => {
    const imageCounter = useRef<number>(0);
    const [availableImages, setAvailableImages] = useState<string[]>([]);

    const STORAGE_BUCKET = 'assets';
    const STORAGE_FOLDER = '';

    useEffect(() => {
        function shuffleArray(array: string[]) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const fetchStorageImages = async () => {
            const { data, error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .list(STORAGE_FOLDER, { limit: 1000, offset: 0 });

            if (error) throw error;

            if (data) {
                const availableImgs = data
                    .filter(file => {
                        if (!file.name || file.name.includes('/') || file.name.startsWith('.')) return false;
                        const name = file.name.toLowerCase();
                        return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp');
                    })
                    .map(file => file.name);
                
                setAvailableImages(shuffleArray(availableImgs));
            }
        }
        fetchStorageImages();
    }, []);

    const getImageSourceURL = (imageName: string = '') => {
        let imageSource;

        const getImageUrl = (imageName: string) => {
            const imagePath = STORAGE_FOLDER ? `${STORAGE_FOLDER}/${imageName}` : imageName;
            const { data } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(imagePath, {
                    transform: {
                        width: 400,
                        height: 160,
                        resize: 'cover',
                        quality: 75
                    }
                });
            return data.publicUrl;
        };

        if (imageName) {
            imageSource = getImageUrl(imageName);
        } else {
            if (availableImages.length > 0) {
                const imgName = availableImages[imageCounter.current % availableImages.length];
                imageCounter.current++;
                imageSource = getImageUrl(imgName);
            } else {
                imageSource = 'https://via.placeholder.com/400x160?text=No+Image';
            }
        }
        return imageSource;
    }

    return (
        <AppContext.Provider value={{ availableImages, imageCounter: imageCounter.current, getImageSourceURL }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};