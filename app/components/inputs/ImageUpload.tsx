"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb";


declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploadedImage, setUploadedImage] = useState(value);

  useEffect(() => {
    setUploadedImage(value);
  }, [value]);

  const handleUpload = useCallback(
    (result: any) => {
      const newValue = result.info.secure_url;
      setUploadedImage(newValue);
      onChange(newValue);
      console.log("Image uploaded:", newValue); // Debug log
    },
    [onChange]
  );

  return (
    <div className="relative">
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="y8todhya"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
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
                {uploadedImage ? "Change Image" : "Click to upload"}
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      {uploadedImage && (
        <div className="absolute inset-0 w-full h-full">
          <Image 
            alt="Upload" 
            fill 
            style={{ objectFit: "cover" }} 
            src={uploadedImage} 
            onError={() => console.error("Image failed to load:", uploadedImage)} // Debug log
          />
        </div>
      )}
    </div>
  );
};


export default ImageUpload;
