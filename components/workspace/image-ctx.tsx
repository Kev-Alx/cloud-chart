import React, { createContext, useContext } from "react";
import { useGenerateImage } from "recharts-to-png"; // Your hook

// Create a context
const ImageGenerationContext = createContext<{
  getDivJpeg: (callback?: BlobCallback) => Promise<string | undefined>;
  divRef: React.MutableRefObject<HTMLDivElement | null>;
} | null>(null);

export const useImageGeneration = () => {
  return useContext(ImageGenerationContext);
};

// Provider component that wraps your app or part of your app
export const ImageGenerationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [getDivJpeg, { ref: divRef }] = useGenerateImage({
    quality: 0.8,
    type: "image/jpeg",
  });

  return (
    <ImageGenerationContext.Provider value={{ getDivJpeg, divRef }}>
      {children}
    </ImageGenerationContext.Provider>
  );
};
