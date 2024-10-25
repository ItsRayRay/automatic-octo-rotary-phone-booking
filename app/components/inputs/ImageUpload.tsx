/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploadWidget, setUploadWidget] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: 'y8todhya',
          multiple: false,
          sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'],
          styles: {
            palette: {
              window: "#ffffff",
              sourceBg: "#f0f0f0",
              windowBorder: "#000000",
              tabIcon: "#555555",
              inactiveTabIcon: "#999999",
              menuIcons: "#555555",
              link: "#000000",
              action: "#000000",
              inProgress: "#000000",
              complete: "#000000",
              error: "#ff0000",
              textDark: "#000000",
              textLight: "#ffffff"
            },
            fonts: {
              default: null,
              "'Poppins', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Poppins",
                active: true
              }
            }
          }
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Upload successful, result:", result);
            onChange(result.info.secure_url);
          }
          if (error) {
            console.error("Upload error:", error);
          }
        }
      );
      setUploadWidget(widget);
    }
  }, [onChange]);

  const handleUpload = useCallback(() => {
    uploadWidget?.open();
  }, [uploadWidget]);

  return (
    <div 
      onClick={handleUpload} 
      className="
        relative
        cursor-pointer
        hover:opacity-70
        transition
        border-dashed 
        border-2 
        p-20 
        border-neutral-300
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-600
      "
    >
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">
        Click to upload
      </div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            alt="Upload"
            fill
            style={{ objectFit: 'cover' }}
            src={value}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
